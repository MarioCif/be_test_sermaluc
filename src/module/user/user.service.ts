import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptjsAdapter } from '../../common/adapter/bcryptjs.adapter';
import { v4 as uuid } from 'uuid';
import { PhoneDto } from './dto/phone.dto';
import { Phone } from './entities/phone.entity';
import { CreateUserResponseDto } from './dto/create-user-response.dto';
import { JwtService } from '@nestjs/jwt';
import { UserReponseDto } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  private readonly logger = new Logger('User Service');

  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly bcryptService: BcryptjsAdapter,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();

    const { password, name, phones, email } = createUserDto;

    try {
      await this.validateUserMail(email);
      const encrypt_password = await this.bcryptService.hashPassword(password);

      const save_user = queryRunner.manager.create(User, {
        user_id: uuid(),
        name: name,
        password: encrypt_password,
        email: email,
        isActive: true,
        last_login: new Date().toISOString().split('T')[0],
      });
      const payload = { sub: save_user.user_id, username: save_user.email };
      const token = await this.jwtService.signAsync(payload);

      save_user.token = token;

      const saved_user = await queryRunner.manager.save(User, save_user);

      await this.savePhoneNumbers(phones, saved_user, queryRunner);

      await queryRunner.commitTransaction();

      const userResponse: CreateUserResponseDto = {
        user_id: save_user.user_id,
        created: save_user.created,
        isActive: save_user.isActive,
        last_login: save_user.last_login,
        modified: save_user.modified,
        token: token,
      };

      return userResponse;
    } catch (error) {
      this.logger.error(error.message);
      await queryRunner.rollbackTransaction();
      if (error instanceof BadRequestException)
        throw new BadRequestException(error.message);

      throw new InternalServerErrorException(
        'Something went wrong: ' + error.message,
      );
    } finally {
      queryRunner.release();
    }
  }

  async findAll() {
    const response = await this.userRepository.find({
      relations: ['phone'],
    });

    const usersReponse = response.map((user) => {
      const userResp = plainToInstance(UserReponseDto, user, {
        excludeExtraneousValues: true,
      });
      userResp.phones = user.phone.map((phone) => {
        const userPhone = plainToInstance(PhoneDto, phone, {
          excludeExtraneousValues: true,
        });
        return userPhone;
      });
      return userResp;
    });
    return usersReponse;
  }

  async findUserById(user_id: string) {
    const response = await this.findPlainUser(user_id);
    const user_response = plainToInstance(UserReponseDto, response, {
      excludeExtraneousValues: true,
    });
    const userPhone = response.phone.map((phone) => {
      const userPhone = plainToInstance(PhoneDto, phone, {
        excludeExtraneousValues: true,
      });
      return userPhone;
    });

    user_response.phones = userPhone;
    return user_response;
  }

  async findOneByUserEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    return user;
  }

  async remove(user_id: string) {
    const user = await this.findPlainUser(user_id);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();
    const token = user.token;
    try {
      await queryRunner.manager.remove(Phone, user.phone);
      await queryRunner.manager.remove(User, user);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        'Something went wrong: ' + error.message,
      );
    } finally {
      queryRunner.release();
    }
    return { token };
  }

  private async savePhoneNumbers(
    phones: PhoneDto[],
    saved_user: User,
    queryRunner: QueryRunner,
  ) {
    const phoneEntities = phones.map((phoneDto) => {
      const phone = queryRunner.manager.create(Phone, {
        ...phoneDto,
        user: saved_user,
      });
      return phone;
    });
    try {
      await queryRunner.manager.save(Phone, phoneEntities);
      return;
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  private async validateUserMail(email: string) {
    const response = await this.findOneByUserEmail(email);
    if (response)
      throw new BadRequestException(`Email ${email} already in use`);
  }

  private async findPlainUser(user_id: string) {
    const response = await this.userRepository.findOne({
      where: { user_id },
      relations: ['phone'],
    });
    if (!response)
      throw new NotFoundException(`Theres not user with id ${user_id}`);
    return response;
  }
}

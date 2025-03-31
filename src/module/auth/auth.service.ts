import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { BcryptjsAdapter } from '../../common/adapter/bcryptjs.adapter';
import { SignInDto } from './interface/signIn.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly bcryptjsService: BcryptjsAdapter,
  ) {}

  async signIn(signInOptions: SignInDto) {
    const { email, password } = signInOptions;
    const user = await this.userService.findOneByUserEmail(email);
    if (!user) throw new UnauthorizedException('User not exist');
    const response = await this.bcryptjsService.comparePasswords(
      password,
      user.password,
    );
    if (!response)
      throw new UnauthorizedException('Email or Password mismatch');

    const payload = { sub: user.user_id, username: user.email };
    const token = await this.jwtService.signAsync(payload);

    user.token = token;
    user.last_login = new Date().toISOString();
    await this.userService.updateUser(user);
    return {
      access_token: token,
    };
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from '../../common/decorator/public-decorator.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user based on the dto data' })
  @ApiResponse({ status: 201, description: 'Succesfully create new users' })
  @ApiResponse({
    status: 400,
    description:
      'Errors with logic, email is already in use, is not possible save phone numbers',
  })
  @ApiResponse({
    status: 500,
    description:
      'For internal errors, like failed transaction, duplicate key or entries',
  })
  @Public()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Endpoint to get all the users' })
  @ApiResponse({ status: 200, description: 'Succesfully fetch all users' })
  @ApiResponse({
    status: 404,
    description: 'Theres no users on data base',
  })
  async findAll() {
    const response = await this.userService.findAll();
    if (response.length === 0)
      throw new NotFoundException('Theres no users on data base');

    return response;
  }

  @Get(':user_id')
  @ApiOperation({ summary: 'Endpoint to get one user by his id' })
  @ApiResponse({ status: 200, description: 'Succesfully fetch the user' })
  @ApiResponse({
    status: 400,
    description: 'The id received is not a UUID',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, need bearer token to work',
  })
  @ApiResponse({
    status: 404,
    description: 'Theres no user asociated to that id',
  })
  findOne(@Param('user_id', ParseUUIDPipe) user_id: string) {
    return this.userService.findUserById(user_id);
  }

  @Delete(':user_id')
  @ApiOperation({
    summary: 'Delete one user and the objects related to him by his id',
  })
  @ApiResponse({ status: 200, description: 'Succesfully delete the user' })
  @ApiResponse({
    status: 400,
    description: 'The id received is not a UUID',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, need bearer token to work',
  })
  @ApiResponse({
    status: 404,
    description: 'Theres no user asociated to that id',
  })
  remove(@Param('user_id') user_id: string) {
    return this.userService.remove(user_id);
  }
}

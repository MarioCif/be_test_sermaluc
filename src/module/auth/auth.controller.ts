import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './interface/signIn.dto';
import { Public } from '../../common/decorator/public-decorator.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @ApiOperation({
    summary: 'LogIn using the email and password to refresh and get jwt token',
  })
  @ApiResponse({ status: 200, description: 'Succesfully login' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, password or email mistmach',
  })
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}

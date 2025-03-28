import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Email of the user', example: 'mario@mario.cl' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Password of the user', example: '112345.m' })
  password: string;
}

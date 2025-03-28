import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { PhoneDto } from './phone.dto';
import { Type } from 'class-transformer';
import { IsPasswordStrength } from '../../../common/decorator/password-validator.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Name of the user', example: 'Mario' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @IsPasswordStrength()
  @ApiProperty({
    description:
      'Password of the user, need to have at least one letter, one number and one symbol',
    example: '123456m.',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Email of the user, have to follow some email pattern',
    example: 'mario@mario.cl',
  })
  email: string;

  @ValidateNested()
  @Type(() => PhoneDto)
  @ApiProperty({
    description: 'A list of phones associated to the user',
    example: '{ number: 123456789, citycode: 89, countrycode: 56789 }',
  })
  phones: PhoneDto[];
}

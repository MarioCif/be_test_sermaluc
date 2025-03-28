import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class PhoneDto {
  @IsNumber()
  @Expose()
  @ApiProperty({ description: 'Phone number of the user', example: '12345678' })
  number: number;

  @IsNumber()
  @Expose()
  @ApiProperty({ description: 'City Code  of the user', example: '12' })
  citycode: number;

  @IsNumber()
  @Expose()
  @ApiProperty({ description: 'Country Code of the user', example: '1' })
  countrycode: number;
}

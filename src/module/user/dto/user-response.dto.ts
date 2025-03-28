import { Expose, Type } from 'class-transformer';
import { PhoneDto } from './phone.dto';

export class UserReponseDto {
  @Expose()
  user_id: string;
  @Expose()
  name: string;
  @Expose()
  email: string;
  @Expose()
  @Type(() => PhoneDto)
  phones: PhoneDto[];
  @Expose()
  created: string;
  @Expose()
  modified: string;
  @Expose()
  last_login: string;
  @Expose()
  token: string;
  @Expose()
  isActive: boolean;
}

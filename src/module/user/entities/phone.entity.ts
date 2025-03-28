import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Phone {
  @PrimaryGeneratedColumn('increment')
  phone_id: number;

  @Column('integer')
  number: number;

  @Column('integer')
  citycode: number;

  @Column('integer')
  countrycode: number;

  @ManyToOne(() => User, (user) => user.phone)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

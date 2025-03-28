import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Phone } from './phone.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column('varchar', { length: 50 })
  name: string;

  @Column('varchar', { length: 200 })
  password: string;

  @Column('varchar', { length: 50 })
  email: string;

  @Column('date')
  created: string;

  @Column('boolean')
  isActive: boolean;

  @Column('date', { nullable: true })
  modified: string;

  @Column('date')
  last_login: string;

  @Column('varchar', { length: 500, nullable: true })
  token: string;

  @OneToMany(() => Phone, (phone) => phone.user)
  phone: Phone[];

  @BeforeInsert()
  addDate() {
    if (!this.created) {
      this.created = new Date().toISOString().split('T')[0];
    }
  }

  @BeforeUpdate()
  updateDate() {
    this.modified = new Date().toISOString().split('T')[0];
  }
}

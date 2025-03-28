import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phone } from './entities/phone.entity';
import { User } from './entities/user.entity';
import { CommonModule } from 'src/common/common.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [UserController],
  providers: [UserService, { provide: APP_GUARD, useClass: AuthGuard }],
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forFeature([User, Phone]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_TOKEN,
      signOptions: { expiresIn: '60m' },
    }),
    CommonModule,
  ],
  exports: [UserService],
})
export class UserModule {}

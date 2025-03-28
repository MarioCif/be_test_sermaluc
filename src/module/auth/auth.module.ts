import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { CommonModule } from 'src/common/common.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../../common/guard/auth.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService, { provide: APP_GUARD, useClass: AuthGuard }],
  imports: [
    ConfigModule.forRoot({}),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_TOKEN,
      signOptions: { expiresIn: '60m' },
    }),
    UserModule,
    CommonModule,
  ],
  exports: [AuthService],
})
export class AuthModule {}

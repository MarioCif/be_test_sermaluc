import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BcryptjsAdapter } from '../../common/adapter/bcryptjs.adapter';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

// Mock the required services
const mockUserService = {
  findOneByUserEmail: jest.fn(),
};
const mockBcryptjsService = {
  comparePasswords: jest.fn(),
};
const mockJwtService = {
  signAsync: jest.fn(),
};

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: BcryptjsAdapter, useValue: mockBcryptjsService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signIn', () => {
    it('should return a JWT token when credentials are correct', async () => {
      const signInDto = { email: 'mario@mario.cl', password: '112345.m' };
      const user = {
        user_id: 1,
        email: 'mario@mario.cl',
        password: 'hashedPassword',
      };

      mockUserService.findOneByUserEmail.mockResolvedValue(user);
      mockBcryptjsService.comparePasswords.mockResolvedValue(true);
      mockJwtService.signAsync.mockResolvedValue('jwt-token');

      const result = await authController.signIn(signInDto);
      expect(result).toEqual({ access_token: 'jwt-token' });
    });

    it('should throw UnauthorizedException if the password is incorrect', async () => {
      const signInDto = { email: 'mario@mario.cl', password: 'wrong-password' };
      const user = {
        user_id: 1,
        email: 'mario@mario.cl',
        password: 'hashedPassword',
      };

      mockUserService.findOneByUserEmail.mockResolvedValue(user);
      mockBcryptjsService.comparePasswords.mockResolvedValue(false);

      await expect(authController.signIn(signInDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if the email does not exist', async () => {
      const signInDto = { email: 'notfound@mario.cl', password: 'password' };

      mockUserService.findOneByUserEmail.mockResolvedValue(null);

      await expect(authController.signIn(signInDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { NotFoundException } from '@nestjs/common';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  const mockUserService = {
    findAll: jest.fn(),
    findUserById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const mockUsers = [
        {
          user_id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          phones: [
            {
              number: 12345678,
              citycode: 12,
              countrycode: 1,
            },
          ],
          created: '2023-03-01T00:00:00Z',
          modified: '2023-03-02T00:00:00Z',
          last_login: '2023-03-02T00:00:00Z',
          token: 'jwt-token',
          isActive: true,
        },
      ];

      mockUserService.findAll.mockResolvedValue(mockUsers);
      const result = await userController.findAll();

      expect(result).toEqual(mockUsers);
    });

    it('should throw a NotFoundException if there are no users', async () => {
      mockUserService.findAll.mockResolvedValue([]);

      await expect(userController.findAll()).rejects.toThrow(NotFoundException);
    });
  });
  describe('findOne', () => {
    it('should return the user when a valid user id is provided', async () => {
      const userId = 'valid-uuid';
      const mockUserResponse = {
        user_id: userId,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phones: [
          {
            number: 12345678,
            citycode: 12,
            countrycode: 1,
          },
        ],
      };

      mockUserService.findUserById.mockResolvedValue(mockUserResponse);

      const result = await userController.findOne(userId);
      expect(result).toEqual(mockUserResponse);
    });

    it('should throw a NotFoundException if the user is not found', async () => {
      const nonExistentUserId = 'nonexistent-uuid';
      mockUserService.findUserById.mockResolvedValue(null);

      await expect(userController.findOne(nonExistentUserId)).rejects.toThrow(
        new NotFoundException('There is no user associated with that id'),
      );
    });
  });
});

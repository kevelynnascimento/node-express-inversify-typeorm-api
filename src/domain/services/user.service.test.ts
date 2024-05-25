import { UserService } from './user.service';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { AuthHelper } from '../../infrastructure/helpers/auth.helper';
import { ContainerConfig } from '../../infrastructure/configs/container.config';
import { DatabaseConfig } from '../../infrastructure/configs/database.config';

describe('UserService', () => {
  let userService: UserService;
  let userRepositoryMock: Partial<UserRepository>;
  let authHelperMock: Partial<AuthHelper>;

  beforeEach(async () => {
    ContainerConfig.start();

    await DatabaseConfig.initialize(true);

    userRepositoryMock = {
      findById: jest.fn().mockResolvedValue({}),
      findAll: jest.fn().mockResolvedValue([]),
      insert: jest.fn(),
      findByUsername: jest.fn().mockResolvedValue({}),
      findAndCount: jest.fn().mockResolvedValue([[]]),
      update: jest.fn(),
    };

    authHelperMock = {
      hashPassword: jest.fn().mockResolvedValue('hashedPassword'),
      comparePassword: jest.fn().mockReturnValue(true),
      generateToken: jest.fn().mockResolvedValue('token'),
    };

    userService = ContainerConfig.container.get<UserService>(UserService);
  });

  describe('create', () => {
    it('should create a user', async () => {
      const request = {
        name: 'Test User',
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123',
        role: 'admin'
      };

      const expected = {
        id: expect.any(String),
      };

      const result = await userService.create(request);

      // expect(userRepositoryMock.insert).toHaveBeenCalled();
      expect(result).toEqual(expected);
    });
  });
});

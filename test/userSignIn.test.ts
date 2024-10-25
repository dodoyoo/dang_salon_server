import { Request, Response } from 'express';
import { UserController } from '../src/domain/user/userController';
import { UserRepository } from '../src/domain/user/userRepository';
import bcrypt from 'bcrypt';

jest.mock('../src/domain/user/userRepository');
const MockedUserRepository = UserRepository as jest.MockedClass<
  typeof UserRepository
>;

describe('UserController', () => {
  let mockUserRepository: InstanceType<typeof MockedUserRepository>;
  let userController: UserController;

  beforeEach(() => {
    mockUserRepository = new MockedUserRepository();
    userController = new UserController(mockUserRepository);
    jest.clearAllMocks();
  });

  describe('sign-up', () => {
    it('should return error for invalid email format', async () => {
      const req = {
        body: {
          email: 'invalid-email',
          password: 'password@1234',
          nickname: 'TestUser',
        },
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await userController.signUp(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        errorType: 'INVALID',
        message: '사용할 수 없는 이메일입니다.',
        statusCode: 400,
      });
    });

    it('should return error for invalid password format', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'short',
          nickname: 'TestUser',
        },
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await userController.signUp(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        errorType: 'INVALID',
        message: '사용할 수 없는 비밀번호 입니다.',
        statusCode: 400,
      });
    });

    it('should return error for already used email', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'password@1234',
          nickname: 'TestUser',
        },
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      mockUserRepository.findByEmail = jest.fn().mockResolvedValue(true); // 이미 사용 중인 이메일

      await userController.signUp(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        errorType: 'INVALID',
        message: '이미 사용중인 이메일입니다.',
        statusCode: 400,
      });
    });
  });

  describe('signIn', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it('should return error for invalid email format', async () => {
      const req = {
        body: { email: 'invalid-email', password: 'password@1234' },
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await userController.signIn(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        errorType: 'INVALID',
        message: '잘못된 이메일 형식입니다.',
        statusCode: 400,
      });
    });

    it('should return error for non-existing user', async () => {
      const req = {
        body: { email: 'nonexistent@example.com', password: 'password@1234' },
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      mockUserRepository.findByEmail = jest.fn().mockResolvedValue(undefined); // 사용자 없음

      await userController.signIn(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        errorType: 'INVALID',
        message: '존재하지 않는 사용자입니다.',
        statusCode: 400,
      });
    });

    it('should return error if email is not verified', async () => {
      const req = {
        body: { email: 'test@example.com', password: 'password@1234' },
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const user = {
        email: 'test@example.com',
        password: await bcrypt.hash('password@1234', 10),
        is_verified: false,
      };
      mockUserRepository.findByEmail = jest.fn().mockResolvedValue(user); // 사용자 존재

      await userController.signIn(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        errorType: 'INVALID',
        message: '이메일 인증이 필요합니다. 인증 후 다시 로그인해주세요.',
        statusCode: 400,
      });
    });

    it('should return error for incorrect password', async () => {
      const req = {
        body: { email: 'test@example.com', password: 'wrongPassword' },
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const user = {
        email: 'test@example.com',
        password: await bcrypt.hash('password@1234', 10),
        is_verified: true,
      };
      mockUserRepository.findByEmail = jest.fn().mockResolvedValue(user); // 사용자 존재

      await userController.signIn(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        errorType: 'INVALID',
        message: '비밀번호가 일치하지 않습니다.',
        statusCode: 400,
      });
    });
  });
});

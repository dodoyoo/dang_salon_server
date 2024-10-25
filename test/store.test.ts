import { Request, Response } from 'express';
import { StoreController } from '../src/domain/store/storeController';
import { StoreRepository } from '../src/domain/store/storeRepository';
import { UserRepository } from '../src/domain/user/userRepository';
import { StoreTimeSlotRepository } from '../src/domain/storeTimeSlot/storeTimeSlotRepository';
import { StoreImageRepository } from '../src/domain/store/storeImageRepository';
import { AppDataSource } from '../src/models/dataSource';

// 모든 repository들과 AppDataSource를 mock
jest.mock('../src/domain/store/storeRepository');
jest.mock('../src/domain/user/userRepository');
jest.mock('../src/domain/store/storeImageRepository');
jest.mock('../src/domain/storeTimeSlot/storeTimeSlotRepository');
jest.mock('../src/models/dataSource', () => ({
  AppDataSource: {
    createQueryRunner: jest.fn(() => ({
      connect: jest.fn(),
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn(),
      manager: {
        save: jest.fn(),
      },
    })),
  },
}));

const MockedStoreRepository = StoreRepository as jest.MockedClass<
  typeof StoreRepository
>;
const MockedUserRepository = UserRepository as jest.MockedClass<
  typeof UserRepository
>;
const MockedStoreImageRepository = StoreImageRepository as jest.MockedClass<
  typeof StoreImageRepository
>;
const MockedStoreTimeSlotRepository =
  StoreTimeSlotRepository as jest.MockedClass<typeof StoreTimeSlotRepository>;

describe('StoreController', () => {
  let storeController: StoreController;
  let mockStoreRepository: InstanceType<typeof MockedStoreRepository>;
  let mockUserRepository: InstanceType<typeof MockedUserRepository>;
  let mockStoreImageRepository: InstanceType<typeof MockedStoreImageRepository>;
  let mockStoreTimeSlotRepository: InstanceType<
    typeof MockedStoreTimeSlotRepository
  >;
  let mockQueryRunner: any;

  beforeEach(() => {
    mockStoreRepository = new MockedStoreRepository();
    mockUserRepository = new MockedUserRepository();
    mockStoreImageRepository = new MockedStoreImageRepository();
    mockStoreTimeSlotRepository = new MockedStoreTimeSlotRepository();

    // QueryRunner mock 설정
    mockQueryRunner = {
      connect: jest.fn(),
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn(),
      manager: {
        save: jest.fn(),
      },
    };
    (AppDataSource.createQueryRunner as jest.Mock).mockReturnValue(
      mockQueryRunner
    );

    storeController = new StoreController(
      mockStoreRepository,
      mockUserRepository,
      mockStoreImageRepository,
      mockStoreTimeSlotRepository
    );

    jest.clearAllMocks();
  });

  describe('createStore', () => {
    it('should return error if user not found', async () => {
      const req = {
        body: {
          name: 'Test Store',
          phone_number: '1234567890',
          address: 'Test Address',
          detail: 'Test Detail',
          open_time: '09:00',
          close_time: '22:00',
          duration_in_minutes: 60,
          break_time: 15,
          slots: '09:00,10:00',
          main_image: 1,
        },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      mockUserRepository.findById = jest.fn().mockResolvedValue(null);

      await storeController.createStore(req, res);

      expect(mockQueryRunner.rollbackTransaction).toHaveBeenCalled();
      expect(mockQueryRunner.release).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        errorType: 'INTERNAL_SERVER_ERROR',
        message: 'INTERNAL_SERVER_ERROR',
        statusCode: 500,
      });
    });

    it('should create a store successfully', async () => {
      const req = {
        body: {
          name: 'Test Store',
          phone_number: '1234567890',
          address: 'Test Address',
          detail: 'Test Detail',
          open_time: '09:00',
          close_time: '22:00',
          duration_in_minutes: 60,
          break_time: 15,
          slots: '09:00,10:00',
          main_image: '0',
        },
        user: { userId: '1' },
        files: [
          {
            location: 'http://example.com/image.jpg',
            originalname: 'image.jpg',
            size: 1234,
            mimetype: 'image/jpeg',
          },
        ],
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const mockStore = { id: 1, main_image: 1 };
      mockUserRepository.findById = jest
        .fn()
        .mockResolvedValue({ is_owner: true });
      mockStoreRepository.createStore = jest.fn().mockResolvedValue(mockStore);
      mockStoreTimeSlotRepository.createTimeSlot = jest
        .fn()
        .mockResolvedValue(true);
      mockStoreImageRepository.createStoreImages = jest
        .fn()
        .mockResolvedValue([{ id: 1 }]);
      mockQueryRunner.manager.save = jest.fn().mockResolvedValue({ mockStore });

      await storeController.createStore(req, res);

      expect(mockQueryRunner.startTransaction).toHaveBeenCalled();
      expect(mockQueryRunner.commitTransaction).toHaveBeenCalled();
      expect(mockQueryRunner.release).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: '가게 등록이 완료되었습니다.',
        newStore: mockStore,
        newStoreImages: [{ id: 1 }],
        newTimeSlot: true,
      });
    });

    // 트랜잭션 실패 케이스 테스트
    it('should rollback transaction on error', async () => {
      const req = {
        body: {
          name: 'Test Store',
          phone_number: '1234567890',
          address: 'Test Address',
          detail: 'Test Detail',
          open_time: '09:00',
          close_time: '22:00',
          duration_in_minutes: 60,
          break_time: 15,
          slots: '09:00,10:00',
        },
        user: { userId: '1' },
        files: [],
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      mockUserRepository.findById = jest
        .fn()
        .mockResolvedValue({ is_owner: true });
      mockStoreRepository.createStore = jest
        .fn()
        .mockRejectedValue(new Error('Database error'));

      await storeController.createStore(req, res);

      expect(mockQueryRunner.rollbackTransaction).toHaveBeenCalled();
      expect(mockQueryRunner.release).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});

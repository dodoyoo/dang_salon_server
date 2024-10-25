import { Request, Response } from 'express';
import { ReservationController } from '../src/domain/reservation/reservationController';
import { reservationRepository } from '../src/domain/reservation/reservationRepository';
import { StoreTimeSlotRepository } from '../src/domain/storeTimeSlot/storeTimeSlotRepository';
import { UserRepository } from '../src/domain/user/userRepository';

jest.mock('../src/domain/reservation/reservationRepository');
jest.mock('../src/domain/user/userRepository');
jest.mock('../src/domain/storeTimeSlot/storeTimeSlotRepository');

const MockedReservationRepository = reservationRepository as jest.MockedClass<
  typeof reservationRepository
>;
const MockedUserRepository = UserRepository as jest.MockedClass<
  typeof UserRepository
>;
const MockedStoreTimeSlotRepository =
  StoreTimeSlotRepository as jest.MockedClass<typeof StoreTimeSlotRepository>;

describe('ReservationController', () => {
  let reservationController: ReservationController;
  let mockReservationRepository: InstanceType<
    typeof MockedReservationRepository
  >;
  let mockUserRepository: InstanceType<typeof MockedUserRepository>;
  let mockStoreTimeSlotRepository: InstanceType<
    typeof MockedStoreTimeSlotRepository
  >;

  beforeEach(() => {
    mockReservationRepository = new MockedReservationRepository();
    mockUserRepository = new MockedUserRepository();
    mockStoreTimeSlotRepository = new MockedStoreTimeSlotRepository();

    reservationController = new ReservationController(
      mockReservationRepository,
      mockStoreTimeSlotRepository
    );
    jest.clearAllMocks();
  });

  describe('createReservations', () => {
    it('should create a reservation successfully', async () => {
      const req = {
        body: {
          store_id: 1,
          user_id: 1,
          slot_id: 1,
          note: 'Test note',
          date: '2024-10-25',
          time: '14:00',
        },
      } as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      mockReservationRepository.createReservations = jest
        .fn()
        .mockResolvedValueOnce(req.body);

      await reservationController.createReservations(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: '예약이 확정되었습니다.',
        reservation: req.body,
      });
    });

    it('should return an error if reservation already exists', async () => {
      const req = {
        body: {
          store_id: 1,
          user_id: 1,
          slot_id: 1,
          note: 'Test note',
          date: '2024-10-25',
          time: '14:00',
        },
      } as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      mockReservationRepository.createReservations = jest
        .fn()
        .mockResolvedValueOnce(null);

      await reservationController.createReservations(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: '예약이 이미 존재합니다.',
        })
      );
    });
  });

  describe('deleteReservations', () => {
    it('should delete a reservation successfully', async () => {
      const req = {
        params: {
          reservationId: '1',
        },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      mockReservationRepository.deleteReservations = jest
        .fn()
        .mockResolvedValueOnce(true);

      await reservationController.deleteReservations(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: '예약이 취소되었습니다.',
        deleteReservationResult: true,
      });
    });

    it('should return an error if reservation does not exist', async () => {
      const req = {
        params: {
          reservationId: '1',
        },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      mockReservationRepository.deleteReservations = jest
        .fn()
        .mockResolvedValueOnce(false);

      await reservationController.deleteReservations(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: '예약이 존재하지 않습니다.',
        })
      );
    });
  });

  describe('getReservations', () => {
    it('should return reservations successfully', async () => {
      const req = {
        params: {
          storeId: '1',
        },
        query: {
          startDate: '2024-10-01',
          endDate: '2024-10-31',
        },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const mockReservations = [
        { id: 1, date: '2024-10-25', time: '14:00', slot_id: 1 },
      ];

      mockReservationRepository.getReservation = jest
        .fn()
        .mockResolvedValueOnce(mockReservations);
      mockStoreTimeSlotRepository.getAllTime = jest
        .fn()
        .mockResolvedValueOnce([]);

      await reservationController.getReservations(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: '예약 정보 불러오기 성공',
        reservations: mockReservations,
      });
    });

    it('should return an error if date range is not provided', async () => {
      const req = {
        params: {
          storeId: '1',
        },
        query: {},
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await reservationController.getReservations(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: '날짜의 범위가 필요합니다.',
        })
      );
    });

    it('should return an error if time slots are not found', async () => {
      const req = {
        params: {
          storeId: '1',
        },
        query: {
          startDate: '2024-10-01',
          endDate: '2024-10-31',
        },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const mockReservations = [
        { id: 1, date: '2024-10-25', time: '14:00', slot_id: 1 },
      ];

      mockReservationRepository.getReservation = jest
        .fn()
        .mockResolvedValueOnce(mockReservations);
      mockStoreTimeSlotRepository.getAllTime = jest
        .fn()
        .mockResolvedValueOnce(null);

      await reservationController.getReservations(req, res);

      expect(res.status).toHaveBeenCalledWith(null);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: '시간 정보를 찾을 수 없습니다.',
        })
      );
    });
  });
});

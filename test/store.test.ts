import { Request, Response } from 'express';
import { StoreController } from '../src/domain/store/storeController';
import { StoreRepository } from '../src/domain/store/storeRepository';
import { UserRepository } from '../src/domain/user/userRepository';
import { StoreTimeSlotRepository } from '../src/domain/storeTimeSlot/storeTimeSlotRepository';
import { StoreImageRepository } from '../src/domain/store/storeImageRepository';

jest.mock('../src/domain/store/storeRepository');
jest.mock('../src/domain/user/userRepository');
jest.mock('../src/domain/store/storeImageRepository');
jest.mock('../src/domain/storeTimeSlot/storeTimeSlotRepository');

const MockedStoreRepository = StoreRepository as jest.MockedClass<typeof StoreRepository>;
const MockedUserRepository = UserRepository as jest.MockedClass<typeof UserRepository>;
const MockedStoreImageRepository = StoreImageRepository as jest.MockedClass<typeof StoreImageRepository>;
const MockedStoreTimeSlotRepository = StoreTimeSlotRepository as jest.MockedClass<typeof StoreTimeSlotRepository>;

describe('StoreController', () => {
    let storeController: StoreController;
    let mockStoreRepository: InstanceType<typeof MockedStoreRepository>;
    let mockUserRepository: InstanceType<typeof MockedUserRepository>;
    let mockStoreImageRepository: InstanceType<typeof MockedStoreImageRepository>;
    let mockStoreTimeSlotRepository: InstanceType<typeof MockedStoreTimeSlotRepository>;

    beforeEach(() => {
        mockStoreRepository = new MockedStoreRepository();
        mockUserRepository = new MockedUserRepository();
        mockStoreImageRepository = new MockedStoreImageRepository();
        mockStoreTimeSlotRepository = new MockedStoreTimeSlotRepository();

        storeController = new StoreController(
            mockStoreRepository,
            mockUserRepository,
            mockStoreImageRepository,
            mockStoreTimeSlotRepository,
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
                },
                user: { userId: '1' },
            } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

            // 사용자 없음
            mockUserRepository.findById = jest.fn().mockResolvedValue(null);

            console.log(1);
            await storeController.createStore(req, res);
            console.log(2);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                errorType: 'INVALID',
                message: '사용자를 찾을 수 없습니다.',
                statusCode: 400,
            });
        });

        it('should return error if user is not owner', async () => {
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
            } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

            // 소유자 아님
            mockUserRepository.findById = jest.fn().mockResolvedValue({ is_owner: false });

            await storeController.createStore(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                errorType: 'INVALID',
                message: '가게를 등록할 수 없습니다.',
                statusCode: 400,
            });
        });

        it('should return error if time slots are missing', async () => {
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
                },
                user: { userId: '1' },
            } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

            await storeController.createStore(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                errorType: 'INVALID',
                message: '시간 정보가 필요합니다.',
                statusCode: 400,
            });
        });

        it('should return error if store creation fails', async () => {
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
            } as unknown as Request;
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

            mockUserRepository.findById = jest.fn().mockResolvedValue({ is_owner: true }); // 소유자
            mockStoreRepository.createStore = jest.fn().mockRejectedValue(new Error('Database error')); // DB 오류

            await storeController.createStore(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                errorType: 'INTERNAL_SERVER_ERROR',
                message: 'Internal server error.',
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

            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

            mockUserRepository.findById = jest.fn().mockResolvedValue({ is_owner: true }); // 소유자
            mockStoreRepository.createStore = jest.fn().mockResolvedValue({ id: 1 }); // 가게 생성 성공
            mockStoreTimeSlotRepository.createTimeSlot = jest.fn().mockResolvedValue(true); // 시간 슬롯 생성 성공
            mockStoreImageRepository.createStoreImages = jest.fn().mockResolvedValue(true); // 이미지 생성 성공

            await storeController.createStore(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: '가게 등록이 완료되었습니다.',
                newStore: { id: 1 },
                newStoreImages: true,
                newTimeSlot: true,
            });
        });
    });
});

import { Request, Response } from 'express';
import { ReservationController } from '../src/domain/reservation/reservationController';
import { reservationRepository } from '../src/domain/reservation/reservationRepository';
import { StoreTimeSlotRepository } from '../src/domain/storeTimeSlot/storeTimeSlotRepository';
import { UserRepository } from '../src/domain/user/userRepository';

jest.mock('../src/domain/reservation/reservationRepository');
jest.mock('../src/domain/user/userRepository');
jest.mock('../src/domain/storeTimeSlot/storeTimeSlotRepository');

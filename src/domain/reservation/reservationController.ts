import { Response, Request } from 'express';
import { reportErrorMessage } from '../../utils/errorHandling';
import { Reservation } from './reservationEntity';
import { reservationRepository } from './reservationRepository';
import { StoreTimeSlotRepository } from '../storeTimeSlot/storeTimeSlotRepository';
import { DuplicatePropertyError, PropertyRequiredError, ValidationError } from '../../utils/customError';
import { StoreTimeSlots } from '../storeTimeSlot/storeTimeSlotEntity';

export class ReservationController {
    private reservationRepository: reservationRepository;
    private storeTimeSlotRepository: StoreTimeSlotRepository;

    constructor() {
        this.reservationRepository = new reservationRepository();
        this.storeTimeSlotRepository = new StoreTimeSlotRepository();
    }

    public async createReservations(req: Request, res: Response) {
        try {
            const { store_id, user_id, slot_id, note, date, time } = req.body;

            const reservationData: Partial<Reservation> = {
                store_id,
                user_id,
                slot_id,
                note,
                date,
                time,
            };

            const reservation = await this.reservationRepository.createReservations(reservationData);
            if (!reservation) {
                const err = new DuplicatePropertyError('예약이 이미 존재합니다.');
                return reportErrorMessage(err, res);
            } else {
                res.status(200).json({ message: '예약이 확정되었습니다.', reservation });
            }
        } catch (err) {
            return reportErrorMessage(err, res);
        }
    }
    // 예약 취소 API
    public async deleteReservations(req: Request, res: Response) {
        try {
            const { reservationId } = req.params;

            const deleteReservationResult = await this.reservationRepository.deleteReservations(
                parseInt(reservationId, 10),
            );

            if (!reservationId) {
                const err = new PropertyRequiredError('예약이 존재하지 않습니다.');
                return reportErrorMessage(err, res);
            }
            res.status(200).json({ message: '예약이 취소되었습니다.', deleteReservationResult });
        } catch (err: unknown) {
            return reportErrorMessage(err, res);
        }
    }

    // 예약 정보 API
    public async getReservations(req: Request, res: Response) {
        try {
            const { storeId } = req.params;
            const { startDate, endDate } = req.query;

            if (!startDate || !endDate) {
                const err = new DuplicatePropertyError('날짜의 범위가 필요합니다.');
                return reportErrorMessage(err, res);
            }

            const reservations = await this.reservationRepository.getReservation(
                storeId as string,
                startDate as string,
                endDate as string,
            );

            const timeSlots: StoreTimeSlots[] | null = await this.storeTimeSlotRepository.getAllTime(storeId);
            if (!timeSlots) {
                const err = new ValidationError('시간 정보를 찾을 수 없습니다.', 'NOTFOUND', timeSlots);
                return reportErrorMessage(err, res);
            }

            const responseData = reservations.map((reservation) => ({
                id: reservation.id,
                date: reservation.date,
                time: reservation.time,
                slot_id: reservation.slot_id,
            }));
            res.status(200).json({
                message: '예약 정보 불러오기 성공',
                reservations: responseData,
            });
        } catch (err) {
            return reportErrorMessage(err, res);
        }
    }
}

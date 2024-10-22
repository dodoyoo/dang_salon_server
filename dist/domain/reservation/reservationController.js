"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationController = void 0;
const errorHandling_1 = require("../../utils/errorHandling");
const reservationRepository_1 = require("./reservationRepository");
const storeTimeSlotRepository_1 = require("../storeTimeSlot/storeTimeSlotRepository");
const customError_1 = require("../../utils/customError");
class ReservationController {
    constructor() {
        this.reservationRepository = new reservationRepository_1.reservationRepository();
        this.storeTimeSlotRepository = new storeTimeSlotRepository_1.StoreTimeSlotRepository();
    }
    createReservations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { store_id, user_id, note, date, time } = req.body;
                const reservationData = {
                    store_id,
                    user_id,
                    note,
                    date,
                    time,
                };
                const reservation = yield this.reservationRepository.createReservations(reservationData);
                if (!reservation) {
                    const err = new customError_1.DuplicatePropertyError('예약이 이미 존재합니다.');
                    return (0, errorHandling_1.reportErrorMessage)(err, res);
                }
                else {
                    res.status(200).json({ message: '예약이 확정되었습니다.', reservation });
                }
            }
            catch (err) {
                return (0, errorHandling_1.reportErrorMessage)(err, res);
            }
        });
    }
    // 예약 취소 API
    deleteReservations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { reservationId } = req.params;
                const deleteReservationResult = yield this.reservationRepository.deleteReservations(parseInt(reservationId, 10));
                if (!reservationId) {
                    const err = new customError_1.PropertyRequiredError('예약이 존재하지 않습니다.');
                    return (0, errorHandling_1.reportErrorMessage)(err, res);
                }
                res.status(200).json({ message: '예약이 취소되었습니다.', deleteReservationResult });
            }
            catch (err) {
                return (0, errorHandling_1.reportErrorMessage)(err, res);
            }
        });
    }
    // 예약 정보 API
    getReservations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { storeId } = req.params;
                const { startDate, endDate } = req.query;
                if (!startDate || !endDate) {
                    const err = new customError_1.DuplicatePropertyError('날짜의 범위가 필요합니다.');
                    return (0, errorHandling_1.reportErrorMessage)(err, res);
                }
                const reservations = yield this.reservationRepository.getReservation(storeId, startDate, endDate);
                const timeSlots = yield this.storeTimeSlotRepository.getAllTime(storeId);
                if (!timeSlots) {
                    const err = new customError_1.ValidationError('시간 정보를 찾을 수 없습니다.', 'NOTFOUND', timeSlots);
                    return (0, errorHandling_1.reportErrorMessage)(err, res);
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
            }
            catch (err) {
                return (0, errorHandling_1.reportErrorMessage)(err, res);
            }
        });
    }
}
exports.ReservationController = ReservationController;
//# sourceMappingURL=reservationController.js.map
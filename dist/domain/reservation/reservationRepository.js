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
exports.reservationRepository = void 0;
const dataSource_1 = require("../../models/dataSource");
const reservationEntity_1 = require("./reservationEntity");
const userEntity_1 = require("../user/userEntity");
const storeEntity_1 = require("../store/storeEntity");
const customError_1 = require("../../utils/customError");
class reservationRepository {
    constructor(dataSource) {
        this.repository = (dataSource || dataSource_1.AppDataSource).getRepository(reservationEntity_1.Reservation);
    }
    createReservations(reservationData) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingReservation = yield this.repository
                .createQueryBuilder('reservation')
                .innerJoin(storeEntity_1.Store, 'store', 'store.id = reservation.store_id')
                .innerJoin(userEntity_1.User, 'user', 'user.id = reservation.user_id')
                .where('reservation.store_id = :storeId', { storeId: reservationData.store_id })
                .andWhere('reservation.user_id = :userId', { userId: reservationData.user_id })
                .andWhere('reservation.date = :date', { date: reservationData.date })
                .andWhere('reservation.time = :time', { time: reservationData.time })
                .getOne();
            if (existingReservation) {
                return false;
            }
            const reservation = this.repository.create(reservationData);
            return yield this.repository.save(reservation);
        });
    }
    // 예약 취소 API
    deleteReservations(reservationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const reservation = yield this.repository.findOneBy({ id: reservationId });
            if (!reservation) {
                throw new customError_1.PropertyRequiredError('예약을 찾을 수 없습니다.');
            }
            yield this.repository.remove(reservation);
        });
    }
    // 예약 정보 api
    getReservation(storeId, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository
                .createQueryBuilder('reservation')
                .where('reservation.store_id = :storeId', { storeId })
                .andWhere('reservation.date between :startDate and :endDate', { startDate, endDate })
                .select(['reservation.id', 'reservation.date', 'reservation.time', 'reservation.slot_id'])
                .getMany();
        });
    }
}
exports.reservationRepository = reservationRepository;
//# sourceMappingURL=reservationRepository.js.map
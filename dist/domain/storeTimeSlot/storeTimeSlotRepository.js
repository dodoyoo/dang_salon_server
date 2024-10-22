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
exports.StoreTimeSlotRepository = void 0;
const dataSource_1 = require("../../models/dataSource");
const storeTimeSlotEntity_1 = require("./storeTimeSlotEntity");
class StoreTimeSlotRepository {
    constructor(dataSource) {
        this.repository = (dataSource || dataSource_1.AppDataSource).getRepository(storeTimeSlotEntity_1.StoreTimeSlots);
    }
    getAllTime(storeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const timeSlots = yield this.repository
                    .createQueryBuilder('store_time_slots')
                    .select(['store_time_slots.id', 'store_time_slots.slot', 'store_time_slots.status'])
                    .where('store_time_slots.store_id = :storeId', { storeId })
                    .orderBy('store_time_slots.slot', 'ASC')
                    .getMany();
                return timeSlots;
            }
            catch (error) {
                console.error('시간 정보를 불러오는데 실패했습니다.', error);
                throw new Error('Fail to get store time slot');
            }
        });
    }
    // 시간 등록
    createTimeSlot(timeSlotData, userId, storeId, queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const addTimeSlot = timeSlotData.map((slot) => {
                return queryRunner.manager.create(storeTimeSlotEntity_1.StoreTimeSlots, Object.assign(Object.assign({}, slot), { user: { id: userId }, store: { id: storeId } }));
            });
            return yield queryRunner.manager.save(addTimeSlot);
        });
    }
}
exports.StoreTimeSlotRepository = StoreTimeSlotRepository;
//# sourceMappingURL=storeTimeSlotRepository.js.map
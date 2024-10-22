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
exports.StoreRepository = void 0;
const dataSource_1 = require("../../models/dataSource");
const storeEntity_1 = require("./storeEntity");
class StoreRepository {
    constructor(dataSource) {
        this.repository = (dataSource || dataSource_1.AppDataSource).getRepository(storeEntity_1.Store);
    }
    findAllStores() {
        return __awaiter(this, arguments, void 0, function* (page = 1, pageSize = 20) {
            try {
                const stores = yield this.repository
                    .createQueryBuilder('store')
                    .leftJoinAndSelect('store.likes', 'store_like')
                    .leftJoinAndSelect('store.store_images', 'store_image')
                    .select([
                    'store.id',
                    'store.name',
                    'store.images',
                    'store.phone_number',
                    'store.address',
                    'store.detail',
                    'store.like_counts',
                    'store.open_time',
                    'store.close_time',
                    'store.duration_in_minutes',
                    'break_time',
                    'store_image',
                    'store_like',
                ])
                    .skip((page - 1) * pageSize)
                    .take(pageSize)
                    .getMany();
                return stores;
            }
            catch (error) {
                console.error('가게을 불러오는데 실패했습니다.', error);
                throw new Error('Failed to get all stores');
            }
        });
    }
    getStoreDetail(storeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const store = yield this.repository
                    .createQueryBuilder('store')
                    .leftJoinAndSelect('store.likes', 'store_like')
                    .leftJoinAndSelect('store.store_images', 'store_image')
                    .select([
                    'store.id',
                    'store.name',
                    'store.images',
                    'store.phone_number',
                    'store.address',
                    'store.detail',
                    'store.like_counts',
                    'store.open_time',
                    'store.close_time',
                    'store.duration_in_minutes',
                    'break_time',
                    'store_image',
                    'store_like',
                ])
                    .orderBy('store.created_at', 'ASC')
                    .where('store.id = :storeId', { storeId })
                    .getOne();
                return store;
            }
            catch (error) {
                console.error('가게을 불러오는데 실패했습니다.', error);
                throw new Error('Failed to get stores');
            }
        });
    }
    // 가게 등록 API
    createStore(storeData, userId, queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const addStore = queryRunner.manager.create(storeEntity_1.Store, Object.assign(Object.assign({}, storeData), { user: { id: userId } }));
            return yield queryRunner.manager.save(addStore);
        });
    }
}
exports.StoreRepository = StoreRepository;
//# sourceMappingURL=storeRepository.js.map
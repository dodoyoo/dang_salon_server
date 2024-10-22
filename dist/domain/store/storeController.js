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
exports.StoreController = void 0;
const errorHandling_1 = require("../../utils/errorHandling");
const storeRepository_1 = require("./storeRepository");
const userRepository_1 = require("../user/userRepository");
const storeImageRepository_1 = require("./storeImageRepository");
const storeTimeSlotRepository_1 = require("../storeTimeSlot/storeTimeSlotRepository");
const customError_1 = require("../../utils/customError");
const dataSource_1 = require("../../models/dataSource");
class StoreController {
    constructor() {
        this.storeRepository = new storeRepository_1.StoreRepository();
        this.userRepository = new userRepository_1.UserRepository();
        this.storeTimeSlotRepository = new storeTimeSlotRepository_1.StoreTimeSlotRepository();
        this.storeImageRepository = new storeImageRepository_1.StoreImageRepository();
    }
    // 모든 가게 가져오기
    findAllStores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stores = yield this.storeRepository.findAllStores();
                if (stores.length === 0) {
                    const err = new customError_1.PropertyRequiredError('가게이 존재하지 않습니다.');
                    return (0, errorHandling_1.reportErrorMessage)(err, res);
                }
                else {
                    res.status(200).json({ message: '목록 가져오기 성공', stores });
                }
            }
            catch (err) {
                return (0, errorHandling_1.reportErrorMessage)(err, res);
            }
        });
    }
    // 가게 detail 가져오기
    getStoreDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const storeId = req.params.id;
                if (!storeId) {
                    const err = new customError_1.PropertyRequiredError('가게 ID가 필요합니다.');
                    return (0, errorHandling_1.reportErrorMessage)(err, res);
                }
                const store = yield this.storeRepository.getStoreDetail(storeId);
                if (!store) {
                    const err = new customError_1.ValidationError('가게을 찾을 수 없습니다.', 'NOTFOUND', 404);
                    return (0, errorHandling_1.reportErrorMessage)(err, res);
                }
                else {
                    res.status(200).json({ message: '가게 불러오기 성공.', store });
                }
            }
            catch (err) {
                return (0, errorHandling_1.reportErrorMessage)(err, res);
            }
        });
    }
    // 가게 시간 정보 가져오기
    findStoreTimes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const storeId = req.params.id;
                if (!storeId) {
                    const err = new customError_1.PropertyRequiredError('가게 ID가 필요합니다.');
                    return (0, errorHandling_1.reportErrorMessage)(err, res);
                }
                const timeSlots = yield this.storeTimeSlotRepository.getAllTime(storeId);
                if (!timeSlots) {
                    const err = new customError_1.ValidationError('시간 정보를 찾을 수 없습니다.', 'NOTFOUND', timeSlots);
                    return (0, errorHandling_1.reportErrorMessage)(err, res);
                }
                else {
                    res.status(200).json({ message: '시간 정보 불러오기 성공', timeSlots });
                }
            }
            catch (err) {
                return (0, errorHandling_1.reportErrorMessage)(err, res);
            }
        });
    }
    // 가게 등록 API
    createStore(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryRunner = dataSource_1.AppDataSource.createQueryRunner();
            yield queryRunner.connect();
            yield queryRunner.startTransaction();
            try {
                const { name, phone_number, address, detail, open_time, close_time, duration_in_minutes, break_time, slots: stringSlots, } = req.body;
                const user_id = req.user.userId;
                const slots = stringSlots === null || stringSlots === void 0 ? void 0 : stringSlots.split(',');
                const parsedUserId = parseInt(user_id, 10);
                if (isNaN(parsedUserId)) {
                    throw new customError_1.PropertyRequiredError('유효한 사용자 ID가 필요합니다.');
                }
                const user = yield this.userRepository.findById(parseInt(user_id, 10));
                if (!user) {
                    const err = new customError_1.PropertyRequiredError('사용자를 찾을 수 없습니다.');
                    return (0, errorHandling_1.reportErrorMessage)(err, res);
                }
                if (!user.is_owner) {
                    const err = new customError_1.PropertyRequiredError('가게을 등록할 수 없습니다.');
                    return (0, errorHandling_1.reportErrorMessage)(err, res);
                }
                if (!slots || !Array.isArray(slots)) {
                    const err = new customError_1.PropertyRequiredError('시간 정보가 필요합니다.');
                    return (0, errorHandling_1.reportErrorMessage)(err, res);
                }
                const storeData = {
                    user_id,
                    name,
                    phone_number,
                    address,
                    detail,
                    open_time,
                    close_time,
                    duration_in_minutes,
                    break_time,
                };
                const newStore = yield this.storeRepository.createStore(storeData, parseInt(user_id, 10), queryRunner);
                const images = req.files;
                const newTimeSlot = yield this.storeTimeSlotRepository.createTimeSlot(slots.map((s) => ({ slot: s })), parsedUserId, newStore.id, queryRunner);
                const storeImageListData = images === null || images === void 0 ? void 0 : images.map((image) => ({
                    image_url: image.location,
                    image_name: image.originalname,
                    image_original_name: image.originalname,
                    image_size: image.size,
                    image_type: image.mimetype,
                }));
                const newStoreImages = yield this.storeImageRepository.createStoreImages(storeImageListData, queryRunner);
                yield queryRunner.commitTransaction();
                res.status(201).json({ message: '가게 등록이 완료되었습니다.', newStore, newStoreImages, newTimeSlot });
            }
            catch (err) {
                yield queryRunner.rollbackTransaction();
                return (0, errorHandling_1.reportErrorMessage)(err, res);
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
}
exports.StoreController = StoreController;
//# sourceMappingURL=storeController.js.map
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
exports.StoreImageRepository = void 0;
const dataSource_1 = require("../../models/dataSource");
const storeImageEntity_1 = require("./storeImageEntity");
// 이미지 업로드
class StoreImageRepository {
    constructor(dataSource) {
        this.repository = (dataSource || dataSource_1.AppDataSource).getRepository(storeImageEntity_1.StoreImage);
    }
    createStoreImages(storeImageListData, queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const addStoreImages = storeImageListData.map((imageData) => {
                return queryRunner.manager.create(storeImageEntity_1.StoreImage, imageData);
            });
            return yield queryRunner.manager.save(addStoreImages);
        });
    }
}
exports.StoreImageRepository = StoreImageRepository;
//# sourceMappingURL=storeImageRepository.js.map
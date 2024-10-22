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
exports.ReviewImageRepository = void 0;
const dataSource_1 = require("../../models/dataSource");
const reviewImageEntity_1 = require("./reviewImageEntity");
//review 이미지 업로드
class ReviewImageRepository {
    constructor(dataSource) {
        this.repository = (dataSource || dataSource_1.AppDataSource).getRepository(reviewImageEntity_1.ReviewImage);
    }
    createReviewImages(reviewImageListData, queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const addReviewImages = reviewImageListData.map((reviewData) => {
                return queryRunner.manager.create(reviewImageEntity_1.ReviewImage, reviewData);
            });
            return yield queryRunner.manager.save(addReviewImages);
        });
    }
}
exports.ReviewImageRepository = ReviewImageRepository;
//# sourceMappingURL=reviewImageRepository.js.map
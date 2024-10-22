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
exports.reviewRepository = void 0;
const dataSource_1 = require("../../models/dataSource");
const reviewEntity_1 = require("./reviewEntity");
const customError_1 = require("../../utils/customError");
class reviewRepository {
    constructor(dataSource) {
        this.repository = (dataSource || dataSource_1.AppDataSource).getRepository(reviewEntity_1.Review);
    }
    createReview(reviewData, queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const review = queryRunner.manager.create(reviewEntity_1.Review, Object.assign({}, reviewData));
            return yield queryRunner.manager.save(review);
        });
    }
    findAllReviews() {
        return __awaiter(this, arguments, void 0, function* (page = 1, pageSize = 20) {
            try {
                const reviews = yield this.repository
                    .createQueryBuilder('review')
                    .leftJoinAndSelect('review.user', 'user')
                    .leftJoinAndSelect('review.store', 'store')
                    .select(['review', 'user.id', 'user.nickname', 'store.id', 'store.name'])
                    .orderBy('review.created_at', 'DESC')
                    .skip((page - 1) * pageSize)
                    .take(pageSize)
                    .getMany();
                return reviews;
            }
            catch (error) {
                console.error('리뷰를 불러오는데 실패했습니다.', error);
                throw new customError_1.PropertyRequiredError('Failed to get all reviews');
            }
        });
    }
    findReviewById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.findOne({
                    where: { id },
                    relations: ['user', 'store'],
                });
            }
            catch (error) {
                console.error('리뷰를 찾는데 실패했습니다.', error);
                throw new customError_1.PropertyRequiredError('Failed to find review');
            }
        });
    }
    updateReview(id, user_id, content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const review = yield this.findReviewById(id);
                if (!review) {
                    return null;
                }
                if (review.user.id !== user_id) {
                    throw new customError_1.PropertyRequiredError('권한이 없습니다');
                }
                review.content = content;
                return yield this.repository.save(review);
            }
            catch (error) {
                console.error('리뷰 수정에 실패했습니다.', error);
                throw error;
            }
        });
    }
    deleteReview(id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const review = yield this.findReviewById(id);
                if (!review) {
                    return false;
                }
                if (review.user.id !== user_id) {
                    throw new customError_1.PropertyRequiredError('권한이 없습니다.');
                }
                yield this.repository.remove(review);
                return true;
            }
            catch (error) {
                console.error('리뷰 삭제에 실패했습니다.', error);
                throw error;
            }
        });
    }
}
exports.reviewRepository = reviewRepository;
//# sourceMappingURL=reviewRepository.js.map
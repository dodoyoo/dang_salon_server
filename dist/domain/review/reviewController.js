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
exports.ReviewController = void 0;
const reviewRepository_1 = require("./reviewRepository");
const reviewImageRepository_1 = require("./reviewImageRepository");
const dataSource_1 = require("../../models/dataSource");
const errorHandling_1 = require("../../utils/errorHandling");
const customError_1 = require("../../utils/customError");
class ReviewController {
    constructor() {
        this.reviewRepository = new reviewRepository_1.reviewRepository();
        this.reviewImageRepository = new reviewImageRepository_1.ReviewImageRepository();
    }
    createReviews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryRunner = dataSource_1.AppDataSource.createQueryRunner();
            yield queryRunner.connect();
            yield queryRunner.startTransaction();
            try {
                const { storeId } = req.params;
                const { user_id, content } = req.body;
                const reviewData = {
                    user_id,
                    store_id: parseInt(storeId, 10),
                    content,
                };
                const images = req.files;
                const reviewImageListData = images === null || images === void 0 ? void 0 : images.map((image) => ({
                    image_name: image.originalname,
                    image_url: image.location,
                    image_original_name: image.originalname,
                    image_size: image.size,
                    image_type: image.mimetype,
                }));
                const review = yield this.reviewRepository.createReview(reviewData, queryRunner);
                const reviewImages = yield this.reviewImageRepository.createReviewImages(reviewImageListData, queryRunner);
                yield queryRunner.commitTransaction();
                res.status(201).json({ message: '리뷰작성이 완료되었습니다.', review, reviewImages });
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
    findAllReviews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reviews = yield this.reviewRepository.findAllReviews();
                if (reviews.length === 0) {
                    const err = new customError_1.NotFoundDataError('리뷰를 찾을 수 없습니다.');
                    return (0, errorHandling_1.reportErrorMessage)(err, res);
                }
                else {
                    res.status(200).json({ message: '리뷰 목록 가져오기 성공', reviews });
                }
            }
            catch (err) {
                return (0, errorHandling_1.reportErrorMessage)(err, res);
            }
        });
    }
    updateReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { reviewId } = req.params;
                const { user_id, content } = req.body;
                const updatedReview = yield this.reviewRepository.updateReview(parseInt(reviewId, 10), user_id, content);
                if (!updatedReview) {
                    const err = new customError_1.NotFoundDataError('리뷰를 찾을 수 없습니다.');
                    return (0, errorHandling_1.reportErrorMessage)(err, res);
                }
                res.status(200).json({ message: '리뷰가 수정되었습니다.', review: updatedReview });
            }
            catch (err) {
                return (0, errorHandling_1.reportErrorMessage)(err, res);
            }
        });
    }
    deleteReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { reviewId } = req.params;
                const { user_id } = req.body;
                const deletedReview = yield this.reviewRepository.deleteReview(parseInt(reviewId, 10), user_id);
                if (!deletedReview) {
                    const err = new customError_1.NotFoundDataError('리뷰를 찾을 수 없습니다.');
                    return (0, errorHandling_1.reportErrorMessage)(err, res);
                }
                res.status(200).json({ message: '리뷰가 삭제되었습니다.' });
            }
            catch (err) {
                return (0, errorHandling_1.reportErrorMessage)(err, res);
            }
        });
    }
}
exports.ReviewController = ReviewController;
//# sourceMappingURL=reviewController.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviewController_1 = require("./reviewController");
const upload_1 = __importDefault(require("../../utils/upload"));
const router = (0, express_1.Router)();
const reviewController = new reviewController_1.ReviewController();
router.post('/api/stores/:storeId/reviews', upload_1.default.array('images'), (req, res) => reviewController.createReviews(req, res));
/**
 * @swagger
 *  /api/stores/{storeId}/reviews:
 *    post:
 *      summary: "리뷰 작성하기"
 *      tags: [Review]
 *      parameters:
 *        - in: path
 *          name: storeId
 *          require: true
 *          description: "가게 ID"
 *          schema:
 *            type: string
 *      requestBody:
 *        require: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user_id:
 *                  type: integer
 *                  description: "사용자 ID"
 *                  example: 1
 *                content:
 *                  type: string
 *                  description: "리뷰 내용"
 *                  example: "가게이 깨끗하고 서비스가 좋았습니다."
 *
 *      responses:
 *        201:
 *          description: "리뷰 작성 성공"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "리뷰작성이 완료되었습니다."
 *                  review:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                        example: 1
 *                      user_id:
 *                        type: integer
 *                        example: 1
 *                      store_id:
 *                        type: integer
 *                        example: 1
 *                      content:
 *                        type: string
 *                        example: "가게이 깨끗하고 서비스가 좋았습니다."
 *                      created_at:
 *                        type: string
 *                      updated_at:
 *                        type: string
 *        400:
 *          description: "잘못된 요청"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "잘못된 요청입니다."
 *        404:
 *          description: "가게을 찾을 수 없음"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "가게을 찾을 수 없습니다."
 */
router.get('/api/reviews', (req, res) => reviewController.findAllReviews(req, res));
/**
 * @swagger
 * /api/reviews:
 *    get:
 *      summary: "모든 리뷰 불러오기"
 *      tags: [Review]
 *      response:
 *        200:
 *          description: "리뷰 목록을 성공적으로 가져왔습니다."
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "리뷰 가져오기 성공"
 *                  reviews:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: integer
 *                          example: 1
 *                        like_count:
 *                          type: integer
 *                          example: 10
 *                        content:
 *                          type: string
 *                          example: "리뷰 내용"
 *        404:
 *          description: "리뷰 목록이 없습니다."
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "리뷰 목록이 없습니다."
 *        500:
 *          description: "서버 오류"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "서버 오류가 발생했습니다."
 */
router.put('/api/reviews/:storeId/:reviewId', (req, res) => reviewController.updateReview(req, res));
/**
 * @swagger
 *  /api/reviews/{storeId}/{reviewId}:
 *    put:
 *      summary: "리뷰 수정하기"
 *      tags: [Review]
 *      parameters:
 *        - in: path
 *          name: storeId
 *          required: true
 *          description: "가게 ID"
 *          schema:
 *            type: string
 *        - in: path
 *          name: reviewId
 *          required: true
 *          description: "리뷰 ID"
 *          schema:
 *            type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user_id:
 *                  type: integer
 *                  description: "사용자 ID"
 *                  example: 1
 *                content:
 *                  type: string
 *                  description: "수정할 리뷰 내용"
 *                  example: "가게이 시원하군요"
 *      responses:
 *        200:
 *          description: "리뷰 수정 성공"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "수정이 완료되었습니다."
 *                  review:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                        example: 1
 *                      user_id:
 *                        type: integer
 *                        example: 1
 *                      store_id:
 *                        type: integer
 *                        example: 1
 *                      content:
 *                        type: string
 *                        example: "가게이 깨끗하고 서비스가 좋았습니다."
 *                      created_at:
 *                        type: string
 *                        format: date-time
 *                        example: "2023-08-20T12:34:56Z"
 *                      updated_at:
 *                        type: string
 *                        format: date-time
 *                        example: "2023-08-20T12:34:56Z"
 *        404:
 *          description: "리뷰를 찾을 수 없음"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "리뷰를 찾을 수 없습니다."
 *        403:
 *          description: "권한이 없음"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "권한이 없습니다."
 */
router.delete('/api/reviews/:storeId/:reviewId', (req, res) => reviewController.deleteReview(req, res));
/**
 * @swagger
 *  /api/reviews/{storeId}/{reviewId}:
 *    delete:
 *      summary: "리뷰 삭제하기"
 *      tags: [Review]
 *      parameters:
 *        - in: path
 *          name: storeId
 *          required: true
 *          description: "가게 ID"
 *          schema:
 *            type: integer
 *        - in: path
 *          name: reviewId
 *          required: true
 *          description: "리뷰 ID"
 *          schema:
 *            type: integer
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user_id:
 *                  type: integer
 *                  description: "사용자 ID"
 *                  example: 1
 *      responses:
 *        200:
 *          description: "리뷰 삭제 성공"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "리뷰가 삭제되었습니다."
 *        400:
 *          description: "잘못된 요청"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "잘못된 요청입니다."
 *        404:
 *          description: "리뷰를 찾을 수 없음"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "리뷰를 찾을 수 없습니다."
 */
exports.default = router;
//# sourceMappingURL=reviewRoute.js.map
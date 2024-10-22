"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const storeController_1 = require("./storeController");
const upload_1 = __importDefault(require("../../utils/upload"));
const jwtAuth_1 = require("../../utils/jwtAuth");
const router = (0, express_1.Router)();
const storeController = new storeController_1.StoreController();
router.get('/api/stores', (req, res) => storeController.findAllStores(req, res));
/**
 * @swagger
 * /api/stores:
 *   get:
 *     summary: "모든 가게 불러오기"
 *     tags: [Store]
 *     responses:
 *       200:
 *         description: "가게 목록을 성공적으로 가져왔습니다."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "목록 가져오기 성공"
 *                 stores:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "가게 이름"
 *                       images:
 *                         type: string
 *                         example: "image_url.jpg"
 *                       phone_number:
 *                         type: string
 *                         example: "010-1234-5678"
 *                       address:
 *                         type: string
 *                         example: "서울특별시 강남구"
 *                       detail:
 *                         type: string
 *                         example: "상세 설명"
 *                       like_counts:
 *                         type: integer
 *                         example: 10
 *       404:
 *         description: "가게 목록이 없습니다."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "가게 목록이 없습니다."
 *       500:
 *         description: "서버 오류"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "서버 오류가 발생했습니다."
 */
router.get('/api/stores/:id', (req, res) => storeController.getStoreDetail(req, res));
/**
 * @swagger
 *  /api/stores/{id}:
 *    get:
 *      summary: "가게 정보 불러오기"
 *      tags: [Store]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: "가게 ID"
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: "가게 정보를 성공적으로 가져왔습니다."
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "가게 불러오기 성공."
 *                  store:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                        example: 1
 *                      name:
 *                        type: string
 *                        example: "가게 이름"
 *                      images:
 *                        type: string
 *                        example: "image_url.jpg"
 *                      phone_number:
 *                        type: string
 *                        example: "010-1234-5678"
 *                      address:
 *                        type: string
 *                        example: "서울특별시 강남구"
 *                      detail:
 *                        type: string
 *                        example: "상세 설명"
 *                      like_counts:
 *                        type: integer
 *                        example: 10
 *        400:
 *          description: "가게 ID가 필요합니다."
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "가게 ID가 필요합니다."
 *        404:
 *          description: "가게을 찾을 수 없습니다."
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "가게을 찾을 수 없습니다."
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
// 가게 등록 router & Swagger
router.post('/api/stores', jwtAuth_1.authMiddleware, upload_1.default.array('images'), (req, res) => storeController.createStore(req, res));
/**
 * @swagger
 * /api/stores:
 *   post:
 *     summary: "가게 등록하기"
 *     security:
 *       - BearerAuth: []
 *     tags: [Store]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "가게 이름"
 *                 example: "댕용실"
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: "이미지 파일"
 *               phone_number:
 *                 type: string
 *                 description: "가게 번호"
 *                 example: "010-1234-5678"
 *               address:
 *                 type: string
 *                 description: "가게 주소"
 *                 example: "서울특별시 구로구 가마산로"
 *               detail:
 *                 type: string
 *                 description: "가게 상세정보"
 *                 example: "편안한 분위기를 만들어줘서 애기들이 편해해요 & 대형견 5만원 중형견 3만5천원 소형견 3만원"
 *               open_time:
 *                 type: string
 *                 description: "가게 오픈 시간"
 *                 example: "09:00"
 *               close_time:
 *                 type: string
 *                 description: "가게 마감 시간"
 *                 example: "21:00"
 *               duration_time:
 *                 type: string
 *                 enum:
 *                   - '30'
 *                   - '60'
 *                 example: "60"
 *               break_time:
 *                 type: string
 *                 description: "휴계 시간"
 *                 example: "30"
 *               slots:
 *                 type: string
 *                 description: "가게 운영 시간"
 *                 example: "09:00,10:00,11:00"
 *     responses:
 *       201:
 *         description: "가게 등록 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "가게 등록에 성공하였습니다."
 *                 store:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "댕댕댕"
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["image_url1.jpg", "image_url2.jpg"]
 *                     phone_number:
 *                       type: string
 *                       example: "010-1234-5678"
 *                     address:
 *                       type: string
 *                       example: "서울특별시 강남구"
 *                     detail:
 *                       type: string
 *                       example: "상세 설명"
 *                     open_time:
 *                       type: string
 *                       example: "09:00"
 *                     close_time:
 *                       type: string
 *                       example: "21:00"
 *                     duration_time:
 *                       type: string
 *                       enum:
 *                         - '30'
 *                         - '60'
 *                       example: "60"
 *                     break_time:
 *                       type: string
 *                       example: "30"
 *                     slots:
 *                       type: string
 *                       example: '["09:00", "10:00", "11:00"]'
 *       403:
 *         description: "가게을 등록할 수 없습니다."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "가게을 등록할 수 없습니다."
 *       404:
 *         description: "사용자를 찾을 수 없습니다."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "사용자를 찾을 수 없습니다."
 *       500:
 *         description: "서버 오류입니다."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "서버 오류입니다."
 */
// 가게 시간 정보 불러오기
router.get('/api/stores/:id/time-slots', (req, res) => storeController.findStoreTimes(req, res));
/**
 * @swagger
 * /api/stores/{id}/time-slots:
 *  get:
 *      summary: "가게 시간 정보 불러오기"
 *      tags: [Store]
 *      parameters:
 *        - in: path
 *          name: id
 *          require: true
 *          description: "가게 ID"
 *          schema:
 *              type: string
 *      responses:
 *        200:
 *          description: "시간 정보 불러오기 성공"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "시간 정보 불러오는데 성공하였습니다."
 *                  timeSlots:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        id:
 *                         type: number
 *                         example: 1
 *                        slot:
 *                         type: string
 *                         example: ["09:00", "10:00", "11:00"]
 *                        status:
 *                         type: string
 *                         example: "open"
 *        404:
 *          description: "시간 정보를 찾을 수 없습니다."
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: string
 *                    example: "시간 정보를 찾을 수 없습니다."
 *                    code:
 *                      type: string
 *                      example: "NOTFOUND"
 *        500:
 *          description: "서버 오류입니다."
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: string
 *                    example: "시간 정보를 찾을 수 없습니다."
 *                    code:
 *                      type: string
 *                      example: "INVALID"
 */
exports.default = router;
//# sourceMappingURL=storeRoute.js.map
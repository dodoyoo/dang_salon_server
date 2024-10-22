import { Router } from 'express';
import { ReservationController } from './reservationController';
import { authMiddleware } from '../../utils/jwtAuth';

const router = Router();
const reservationController = new ReservationController();

router.post('/api/reservations', authMiddleware, (req, res) => reservationController.createReservations(req, res));
/**
 * @swagger
 *  /api/reservations:
 *    post:
 *      summary: "예약 생성하기"
 *      security:
 *        - BearerAuth: []
 *      tags: [Reservation]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                store_id:
 *                  type: integer
 *                  description: "상점 ID"
 *                  example: 1
 *                user_id:
 *                  type: integer
 *                  description: "사용자 ID"
 *                  example: 1
 *                slot_id:
 *                  type: integer
 *                  description: "시간 ID"
 *                  example: 1
 *                note:
 *                  type: string
 *                  description: "견종 & 요구사항 적기"
 *                  example: "치와와, 전신 미용하고 싶어요"
 *                date:
 *                  type: string
 *                  format: date
 *                  description: "예약 날짜"
 *                  example: "2023-09-15"
 *                time:
 *                  type: string
 *                  format: time
 *                  description: "예약 시간"
 *                  example: "14:00"
 *      responses:
 *        201:
 *          description: "예약이 성공적으로 생성되었습니다."
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "예약이 확정되었습니다."
 *                  reservation:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                        description: "예약 ID"
 *                        example: 1
 *                      store_id:
 *                        type: integer
 *                        description: "상점 ID"
 *                        example: 1
 *                      user_id:
 *                        type: integer
 *                        description: "사용자 ID"
 *                        example: 1
 *                      slot_id:
 *                        type: integer
 *                        description: "시계 ID"
 *                        example: 1
 *                      note:
 *                        type: string
 *                        description: "견종 & 요구사항 적기"
 *                        example: "푸들 & 손, 발 미용하고싶어요"
 *                      date:
 *                        type: string
 *                        format: date
 *                        description: "예약 날짜"
 *                        example: "2023-09-15"
 *                      time:
 *                        type: string
 *                        format: time
 *                        description: "예약 시간"
 *                        example: "14:00"
 *        400:
 *          description: "잘못된 요청입니다."
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "데이터가 유효하지 않습니다."
 *        409:
 *          description: "예약이 이미 존재합니다."
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "예약이 이미 존재합니다."
 *
 *        500:
 *          description: "서버 오류입니다."
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "서버 오류입니다."
 */

// 예약 취소 & Swagger
router.delete('/api/reservations/:reservationId', authMiddleware, (req, res) =>
    reservationController.deleteReservations(req, res),
);
/**
 * @swagger
 *  /api/reservations/{reservationId}:
 *    delete:
 *      summary: "예약 취소하기"
 *      security:
 *        - BearerAuth: []
 *      tags: [Reservation]
 *      parameters:
 *        - in: path
 *          name: reservationId
 *          required: true
 *          description: "예약 ID"
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: "예약 취소 성공"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "예약이 취소되었습니다."
 *        400:
 *          description: "예약을 찾을 수 없습니다."
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "예약을 찾을 수 없습니다."
 *        500:
 *          description: "서버 오류"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "서버 오류입니다."
 */

router.get('/api/stores/:storeId/reservations', authMiddleware, (req, res) =>
    reservationController.getReservations(req, res),
);
/**
 * @swagger
 *  /api/stores/{storeId}/reservations:
 *    get:
 *      summary: "예약 정보 가져오기"
 *      tags: [Reservation]
 *      parameters:
 *        - in: path
 *          name: storeId
 *          require: true
 *          description: "가게 ID"
 *          schema:
 *            type: string
 *        - in: query
 *          name: startDate
 *          require: true
 *          description: "예약 정보 시작 범위"
 *          schema:
 *            type: string
 *        - in: query
 *          name: endDate
 *          require: true
 *          description: "예약 정보 끝 범위"
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: "예약 현황 조회 성공"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "예약 현황 조회 완료했습니다."
 *                  timeSlotStatus:
 *                    type: array
 *                    items:
 *                     type: object
 *                     properties:
 *                       slot:
 *                         type: string
 *                         example: '1'
 *                       status:
 *                         type: string
 *                         enum: [open, close]
 *                         example: open
 *        500:
 *          description: "서버 오류"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: string
 *                    example: "서버 오류입니다."
 *                    code:
 *                      type: string
 *                      example: "서버 오류입니다."
 */
export default router;

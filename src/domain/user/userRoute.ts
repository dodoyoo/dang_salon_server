import { Request, Response, Router } from 'express';
import { UserController } from './userController';
import { UserRepository } from './userRepository';
import { authMiddleware } from '../../utils/jwtAuth';
import { OAuth2Client } from 'google-auth-library';
import path from 'path';
import axios from 'axios';

const router = Router();
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URL = 'https://dangsalon.com/login/redirect'; // 리디렉션 URL
const client = new OAuth2Client(GOOGLE_CLIENT_ID);
const userRepository = new UserRepository();
const userController = new UserController(userRepository);

router.post('/api/sign-up', (req, res) => userController.signUp(req, res));

/**
 * @swagger
 * path:
 * /api/sign-up:
 *  post:
 *     summary: "유저 회원가입"
 *     tags: [User]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  email:
 *                    type: string
 *                    description: "유저 이메일"
 *                    example: "asd123@naver.com"
 *                  password:
 *                    type: string
 *                    description: " 유저 비밀번호"
 *                    example: "zxcvasd123!"
 *                  nickname:
 *                    type: string
 *                    description: "유저 닉네임"
 *                    example: "nickname"
 *     responses:
 *      '200':
 *         description: "회원가입 성공"
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  message:
 *                      type: string
 *                      description: "회원가입이 성공적으로 완료되었습니다."
 *      '400':
 *         description: "형식 오류입니다."
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  message:
 *                      type: string
 *                      description: "이메일 형식이 다릅니다, 비밀번호 형식이 다릅니다."
 *      '500':
 *         description: 서버오류
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  message:
 *                      type: string
 *                      description: "서버 오류입니다."
 */

router.post('/api/sign-in', (req, res) => userController.signIn(req, res));
/**
 * @swagger
 * /api/sign-in:
 *  post:
 *     summary: "유저 로그인"
 *     tags: [User]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  email:
 *                    type: string
 *                    description: "유저 이메일"
 *                    example: "dong15903@gmail.com"
 *                  password:
 *                    type: string
 *                    description: "유저 비밀번호"
 *                    example: "dkdltmzmfla22!"
 *     responses:
 *      '200':
 *         description: "로그인 성공"
 *         content:
 *          application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  message:
 *                      type: string
 *                      description: "로그인 성공하였습니다."
 *                  user:
 *                      type: object
 *                      properties:
 *                          token:
 *                              type: string
 *                              description: "JWT토큰"
 *                          email:
 *                              type: string
 *                              description: "유저 이메일"
 *                          nickname:
 *                              type: string
 *                              description: "유저 닉네임"
 *                          profileImage:
 *                              type: string
 *                              description: "유저 프로필 이미지"
 *      '400':
 *         description: "형식 오류입니다."
 *         content:
 *          application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  message:
 *                      type: string
 *                      description: "이메일과 비밀번호를 확인하세요."
 *      '500':
 *         description: "서버 오류"
 *         content:
 *          application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  message:
 *                      type: string
 *                      description: "서버 오류입니다."
 */

// myPage Router 설정 & swagger 작성
router.get('/api/users/:userId', authMiddleware, (req, res) =>
  userController.getUserById(req, res)
);
/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     summary: 사용자 마이페이지 조회
 *     security:
 *       - BearerAuth: []
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: 사용자 ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 마이페이지 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "마이페이지 조회 성공"
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     nickname:
 *                       type: string
 *                       example: "사용자닉네임"
 *                     profile_image:
 *                       type: string
 *                       example: "http://example.com/profile.jpg"
 *                     is_owner:
 *                       type: boolean
 *                       example: true
 *                     reviews:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           user_id:
 *                             type: integer
 *                             example: 1
 *                           like_counts:
 *                             type: integer
 *                             example: 10
 *                           content:
 *                             type: string
 *                             example: "좋은 서비스였습니다."
 *                     reservations:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           user_id:
 *                             type: integer
 *                             example: 1
 *                           date:
 *                             type: string
 *                             format: date
 *                             example: "2024-09-05"
 *                           time:
 *                             type: string
 *                             format: time
 *                             example: "14:00"
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "userId를 확인하세요."
 *       404:
 *         description: 사용자를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "사용자를 찾을 수 없습니다."
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "서버 오류가 발생했습니다."
 */

// 구글 로그인 시작
router.get('/login', (req: Request, res: Response) => {
  let url = 'https://accounts.google.com/o/oauth2/v2/auth';
  url += `?client_id=${GOOGLE_CLIENT_ID}`;
  url += `&redirect_uri=${GOOGLE_REDIRECT_URL}`;
  url += `&response_type=code`;
  url += '&scope=email profile';

  res.redirect(url);
});

// 구글 로그인 리디렉션 처리
router.get('/login/redirect', async (req: Request, res: Response) => {
  const { code } = req.query;

  try {
    const tokenResponse = await axios.post(
      'https://oauth2.googleapis.com/token',
      {
        code: code as string,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: GOOGLE_REDIRECT_URL,
        grant_type: 'authorization_code',
      }
    );

    const tokens: any = tokenResponse.data; // 토큰 정보 가져오기
    client.setCredentials(tokens);

    // 구글 사용자 정보 가져오기
    const userInfoResponse = await axios.get(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      }
    );

    const userInfo = userInfoResponse.data;
    console.log(`User Info: ${JSON.stringify(userInfo)}`);

    res.send('로그인 성공: ' + JSON.stringify(userInfo));
  } catch (err) {
    console.error('Error during Google login:', err);

    res.status(500).send('로그인 중 오류가 발생했습니다.');
  }
});

// email
// router.get('/email-verification', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'user', 'emailcheck.html'));
// });
router.get('/api/verify', (req, res) => userController.verifyEmail(req, res));
/**
 * @swagger
 * path:
 * /api/verify:
 *     get:
 *       summary: "이메일 인증"
 *       tags: [User]
 *       parameters:
 *         - in: query
 *           name: token
 *           required: true
 *           description: 인증 토큰
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: 이메일 인증 성공
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "이메일 인증 성공"
 *         400:
 *           description: 토큰이 필요합니다
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "토큰이 필요합니다."
 *         404:
 *           description: 유효하지 않은 토큰
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "유효하지 않은 토큰입니다."
 */
export default router;

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const emailConfirm_1 = require("../../utils/emailConfirm");
const userRepository_1 = require("./userRepository");
const errorHandling_1 = require("../../utils/errorHandling");
const customError_1 = require("../../utils/customError");
const comparePassword = (inputPassword, storedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return bcrypt_1.default.compare(inputPassword, storedPassword);
});
const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-z\d!@#$%^&*(),.?":{}|<>]{10,}$/;
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10;
    return bcrypt_1.default.hash(password, saltRounds);
}); // hash는 밖으로 빼내기
class UserController {
    constructor() {
        this.userRepository = new userRepository_1.UserRepository();
    }
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, nickname } = req.body;
                if (!emailRegex.test(email)) {
                    throw new customError_1.InvalidPropertyError('사용할 수 없는 이메일입니다.');
                }
                if (!passwordRegex.test(password)) {
                    throw new customError_1.InvalidPropertyError('사용할 수 없는 비밀번호 입니다.');
                }
                const hashedPassword = yield hashPassword(password);
                const userExists = yield this.userRepository.findByEmail(email);
                if (userExists) {
                    throw new customError_1.InvalidPropertyError('이미 사용중인 이메일입니다.');
                }
                const verification_token = crypto_1.default.randomBytes(32).toString('hex');
                yield this.userRepository.createUser({
                    email,
                    password: hashedPassword,
                    nickname,
                    log_in_type: 'user',
                    verification_token,
                    is_verified: false,
                });
                yield (0, emailConfirm_1.sendVerificationEmail)(email, verification_token);
                res.status(201).json({ message: '회원가입 성공' });
            }
            catch (err) {
                return (0, errorHandling_1.reportErrorMessage)(err, res);
            }
        });
    }
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
                if (!emailRegex.test(email)) {
                    throw new customError_1.InvalidPropertyError('잘못된 이메일 형식입니다.');
                }
                const user = yield this.userRepository.findByEmail(email);
                if (!user) {
                    throw new customError_1.InvalidPropertyError('존재하지 않는 사용자입니다.');
                }
                if (!user.is_verified) {
                    throw new customError_1.InvalidPropertyError('이메일 인증이 필요합니다. 인증 후 다시 로그인해주세요.');
                }
                const isPasswordValid = yield comparePassword(password, user.password);
                if (!isPasswordValid) {
                    throw new customError_1.InvalidPropertyError('비밀번호가 일치하지 않습니다.');
                }
                const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET_KEY, {
                    expiresIn: '7d',
                });
                console.log('JWT_SECRET_KEY:', process.env.JWT_SECRET_KEY);
                res.status(200).json({
                    message: '로그인 성공',
                    user: {
                        token,
                        email: user.email,
                        nickname: user.nickname,
                        profileImage: user.profile_image,
                    },
                });
            }
            catch (err) {
                return (0, errorHandling_1.reportErrorMessage)(err, res);
            }
        });
    }
    // myPage Controller 작성
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                if (!userId) {
                    return res.status(400).json({ message: 'userId가 필요합니다.' });
                }
                const user = yield this.userRepository.getUserById(parseInt(userId, 10));
                if (!user) {
                    const err = new customError_1.PropertyRequiredError('사용자를 찾을 수 없습니다.');
                }
                res.status(200).json({ message: 'myPage 불러오기 성공', user });
            }
            catch (err) {
                return (0, errorHandling_1.reportErrorMessage)(err, res);
            }
        });
    }
    verifyEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.query;
            if (!token) {
                return new customError_1.PropertyRequiredError('토큰이 필요합니다.');
            }
            const user = yield this.userRepository.findByVerification_token(token);
            if (!user) {
                return new customError_1.InvalidPropertyError('유효하지 않은 토큰입니다.');
            }
            user.is_verified = true;
            user.verification_token = null;
            yield this.userRepository.updateUser(user);
            res.status(200).json({ message: '이메일 인증 완료' });
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map
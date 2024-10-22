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
exports.UserRepository = void 0;
const dataSource_1 = require("../../models/dataSource");
const userEntity_1 = require("./userEntity");
class UserRepository {
    constructor(dataSource) {
        this.repository = (dataSource || dataSource_1.AppDataSource).getRepository(userEntity_1.User);
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const emails = (yield this.repository
                    .createQueryBuilder('user')
                    .where('user.email = :email', { email })
                    .getOne());
                return emails;
            }
            catch (error) {
                console.error('User를 찾을 수 없습니다:', error);
            }
        });
    }
    // 가게 등록을 위한 user_id로 user 찾기
    findById(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = (yield this.repository
                    .createQueryBuilder('user')
                    .where('user.id = :user_id', { user_id })
                    .getOne());
                return user;
            }
            catch (error) {
                console.error('User를 찾을 수 없습니다.', error);
            }
        });
    }
    // 이메일 인증을 위한 user 수정
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.save(user);
            }
            catch (error) {
                console.error('수정을 할 수 없습니다', error);
                throw new Error('Could not update user');
            }
        });
    }
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = this.repository.create(userData);
                return yield this.repository.save(user);
            }
            catch (error) {
                console.error('Error creating user:', error);
                throw new Error('Could not create user');
            }
        });
    }
    findByVerification_token(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findOne({ where: { verification_token: token } });
        });
    }
    // myPage repository 작성
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.repository
                    .createQueryBuilder('user')
                    .leftJoinAndSelect('user.reviews', 'review')
                    .leftJoinAndSelect('user.reservations', 'reservation')
                    .where('user.id = :userId', { userId })
                    .select([
                    'user.email',
                    'user.nickname',
                    'user.profile_image',
                    'user.is_owner',
                    'review.user_id',
                    'review.like_counts',
                    'review.content',
                    'reservation.user_id',
                    'reservation.date',
                    'reservation.time',
                ])
                    .getOne();
                return user;
            }
            catch (error) {
                console.error('MyPage를 가져오는 중 오류가 발생했습니다.', error);
                throw new Error('Could not fetch myPage');
            }
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=userRepository.js.map
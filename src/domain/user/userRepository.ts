import { Repository } from 'typeorm';
import { AppDataSource } from '../../models/dataSource';
import { User } from './userEntity';
import { Reservation } from '../reservation/reservationEntity';
import { Review } from '../review/reviewEntity';

export class UserRepository {
    private repository: Repository<User>;

    constructor(dataSource?: typeof AppDataSource) {
        this.repository = (dataSource || AppDataSource).getRepository(User);
    }
    async findByEmail(email: string): Promise<User | undefined> {
        try {
            const emails = (await this.repository
                .createQueryBuilder('user')
                .where('user.email = :email', { email })
                .getOne()) as User | undefined;
            return emails;
        } catch (error) {
            console.error('User를 찾을 수 없습니다:', error);
        }
    }
    // 가게 등록을 위한 user_id로 user 찾기
    async findById(user_id: number): Promise<User | undefined> {
        try {
            const user = (await this.repository
                .createQueryBuilder('user')
                .where('user.id = :user_id', { user_id })
                .getOne()) as User | undefined;
            return user;
        } catch (error) {
            console.error('User를 찾을 수 없습니다.', error);
        }
    }
    // 이메일 인증을 위한 user 수정
    async updateUser(user: User): Promise<User> {
        try {
            return await this.repository.save(user);
        } catch (error) {
            console.error('수정을 할 수 없습니다', error);
            throw new Error('Could not update user');
        }
    }

    async createUser(userData: Partial<User>): Promise<User> {
        try {
            const user = this.repository.create(userData);
            return await this.repository.save(user);
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Could not create user');
        }
    }

    async findByVerification_token(token: string): Promise<User | null> {
        return await this.repository.findOne({ where: { verification_token: token } });
    }

    // myPage repository 작성
    async getUserById(userId: number): Promise<User | null> {
        try {
            const user = await this.repository
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
        } catch (error) {
            console.error('MyPage를 가져오는 중 오류가 발생했습니다.', error);
            throw new Error('Could not fetch myPage');
        }
    }
}

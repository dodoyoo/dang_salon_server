import { QueryRunner, Repository } from 'typeorm';
import { AppDataSource } from '../../models/dataSource';
import { Review } from './reviewEntity';
import { PropertyRequiredError } from '../../utils/customError';

export class reviewRepository {
    private repository: Repository<Review>;

    constructor(dataSource?: typeof AppDataSource) {
        this.repository = (dataSource || AppDataSource).getRepository(Review);
    }

    public async createReview(reviewData: Partial<Review>, queryRunner: QueryRunner): Promise<Review> {
        const review = queryRunner.manager.create(Review, { ...reviewData });
        return await queryRunner.manager.save(review);
    }

    public async findAllReviews(page: number = 1, pageSize: number = 20): Promise<Review[]> {
        try {
            const reviews = await this.repository
                .createQueryBuilder('review')
                .leftJoinAndSelect('review.user', 'user')
                .leftJoinAndSelect('review.store', 'store')
                .select(['review', 'user.id', 'user.nickname', 'store.id', 'store.name'])
                .orderBy('review.created_at', 'DESC')
                .skip((page - 1) * pageSize)
                .take(pageSize)
                .getMany();

            return reviews;
        } catch (error) {
            console.error('리뷰를 불러오는데 실패했습니다.', error);
            throw new PropertyRequiredError('Failed to get all reviews');
        }
    }
    public async findReviewById(id: number): Promise<Review | null> {
        try {
            return await this.repository.findOne({
                where: { id },
                relations: ['user', 'store'],
            });
        } catch (error) {
            console.error('리뷰를 찾는데 실패했습니다.', error);
            throw new PropertyRequiredError('Failed to find review');
        }
    }

    public async updateReview(id: number, user_id: number, content: string): Promise<Review | null> {
        try {
            const review = await this.findReviewById(id);
            if (!review) {
                return null;
            }
            if (review.user.id !== user_id) {
                throw new PropertyRequiredError('권한이 없습니다');
            }
            review.content = content;
            return await this.repository.save(review);
        } catch (error) {
            console.error('리뷰 수정에 실패했습니다.', error);
            throw error;
        }
    }

    public async deleteReview(id: number, user_id: number): Promise<boolean> {
        try {
            const review = await this.findReviewById(id);
            if (!review) {
                return false;
            }
            if (review.user.id !== user_id) {
                throw new PropertyRequiredError('권한이 없습니다.');
            }
            await this.repository.remove(review);
            return true;
        } catch (error) {
            console.error('리뷰 삭제에 실패했습니다.', error);
            throw error;
        }
    }
}

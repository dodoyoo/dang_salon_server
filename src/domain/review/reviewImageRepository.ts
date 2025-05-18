import { QueryRunner, Repository } from 'typeorm';
import { AppDataSource } from '../../models/dataSource';
import { ReviewImage } from './reviewImageEntity';

//review 이미지 업로드

export class ReviewImageRepository {
    private repository: Repository<ReviewImage>;

    constructor(dataSource?: typeof AppDataSource) {
        this.repository = (dataSource || AppDataSource).getRepository(ReviewImage);
    }

    public async createReviewImages(
        reviewImageListData: Partial<ReviewImage>[],
        queryRunner: QueryRunner,
    ): Promise<ReviewImage[]> {
        const addReviewImages = reviewImageListData.map((reviewData) => {
            return queryRunner.manager.create(ReviewImage, reviewData);
        });
        return await queryRunner.manager.save(addReviewImages);
    }
}

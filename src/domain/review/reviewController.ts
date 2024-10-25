import { Request, Response } from 'express';
import { Review } from './reviewEntity';
import { ReviewImage } from './reviewImageEntity';
import { reviewRepository } from './reviewRepository';
import { ReviewImageRepository } from './reviewImageRepository';
import { AppDataSource } from '../../models/dataSource';
import { reportErrorMessage } from '../../utils/errorHandling';
import { NotFoundDataError } from '../../utils/customError';

export class ReviewController {
  private reviewRepository: reviewRepository;
  private reviewImageRepository!: ReviewImageRepository;

  constructor(
    reviewRepository: reviewRepository,
    reviewImageRepository: ReviewImageRepository
  ) {
    this.reviewRepository = reviewRepository;
    this.reviewImageRepository = reviewImageRepository;
  }
  public async createReviews(req: Request, res: Response) {
    const queryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { storeId } = req.params;
      const { user_id, content } = req.body;

      const reviewData: Partial<Review> = {
        user_id,
        store_id: parseInt(storeId, 10),
        content,
      };
      const images = req.files as (Express.Multer.File & {
        location: string;
      })[];
      const reviewImageListData: Partial<ReviewImage>[] = images?.map(
        (image) => ({
          image_name: image.originalname,
          image_url: image.location,
          image_original_name: image.originalname,
          image_size: image.size,
          image_type: image.mimetype,
        })
      );

      const review = await this.reviewRepository.createReview(
        reviewData,
        queryRunner
      );
      const reviewImages = await this.reviewImageRepository.createReviewImages(
        reviewImageListData,
        queryRunner
      );
      await queryRunner.commitTransaction();
      res
        .status(201)
        .json({ message: '리뷰작성이 완료되었습니다.', review, reviewImages });
    } catch (err: unknown) {
      await queryRunner.rollbackTransaction();
      return reportErrorMessage(err, res);
    } finally {
      await queryRunner.release();
    }
  }

  public async findAllReviews(req: Request, res: Response) {
    try {
      const reviews: Review[] = await this.reviewRepository.findAllReviews();

      if (reviews.length === 0) {
        const err = new NotFoundDataError('리뷰를 찾을 수 없습니다.');
        return reportErrorMessage(err, res);
      } else {
        res.status(200).json({ message: '리뷰 목록 가져오기 성공', reviews });
      }
    } catch (err: unknown) {
      return reportErrorMessage(err, res);
    }
  }

  public async updateReview(req: Request, res: Response) {
    try {
      const { reviewId } = req.params;
      const { user_id, content } = req.body;

      const updatedReview = await this.reviewRepository.updateReview(
        parseInt(reviewId, 10),
        user_id,
        content
      );

      if (!updatedReview) {
        const err = new NotFoundDataError('리뷰를 찾을 수 없습니다.');
        return reportErrorMessage(err, res);
      }
      res
        .status(200)
        .json({ message: '리뷰가 수정되었습니다.', review: updatedReview });
    } catch (err: unknown) {
      return reportErrorMessage(err, res);
    }
  }

  public async deleteReview(req: Request, res: Response) {
    try {
      const { reviewId } = req.params;
      const { user_id } = req.body;

      const deletedReview = await this.reviewRepository.deleteReview(
        parseInt(reviewId, 10),
        user_id
      );

      if (!deletedReview) {
        const err = new NotFoundDataError('리뷰를 찾을 수 없습니다.');
        return reportErrorMessage(err, res);
      }
      res.status(200).json({ message: '리뷰가 삭제되었습니다.' });
    } catch (err: unknown) {
      return reportErrorMessage(err, res);
    }
  }
}

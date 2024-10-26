import { Request, Response } from 'express';
import { ReviewController } from '../src/domain/review/reviewController';
import { reviewRepository } from '../src/domain/review/reviewRepository';
import { ReviewImageRepository } from '../src/domain/review/reviewImageRepository';
import { AppDataSource } from '../src/models/dataSource';
import { Review } from '../src/domain/review/reviewEntity';
import { NotFoundDataError } from '../src/utils/customError';

jest.mock('../src/domain/review/reviewRepository');
jest.mock('../src/domain/review/reviewImageRepository');
jest.mock('../src/models/dataSource', () => ({
  AppDataSource: {
    createQueryRunner: jest.fn(() => ({
      connect: jest.fn(),
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn(),
      manager: {
        save: jest.fn(),
      },
    })),
  },
}));

describe('ReviewController', () => {
  let reviewController: ReviewController;
  let mockReviewRepository: jest.Mocked<reviewRepository>;
  let mockReviewImageRepository: jest.Mocked<ReviewImageRepository>;
  let mockQueryRunner: any;
  let mockReview: Review;

  beforeEach(() => {
    jest.clearAllMocks();

    mockReviewRepository = {
      createReview: jest.fn(),
      findAllReviews: jest.fn(),
      updateReview: jest.fn(),
      deleteReview: jest.fn(),
    } as unknown as jest.Mocked<reviewRepository>;

    mockReviewImageRepository = {
      createReviewImages: jest.fn(),
    } as unknown as jest.Mocked<ReviewImageRepository>;

    mockQueryRunner = {
      connect: jest.fn(),
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn(),
      manager: {
        save: jest.fn(),
      },
    };

    mockReview = {
      id: 1,
      store_id: 1,
      user_id: 1,
      content: 'testReview',
      like_counts: 0,
      created_at: new Date(),
      updated_at: new Date(),
      user: {
        id: 1,
        email: 'test@test.com',
        nickname: 'testUser',
        created_at: new Date(),
        updated_at: new Date(),
      },
      store: {
        id: 1,
        name: 'Test Store',
        address: 'Test Address',
        created_at: new Date(),
        updated_at: new Date(),
      },
      review_images: [],
      likes: [],
    } as unknown as Review;

    (AppDataSource.createQueryRunner as jest.Mock).mockReturnValue(
      mockQueryRunner
    );

    reviewController = new ReviewController(
      mockReviewRepository,
      mockReviewImageRepository
    );
  });

  // 기존의 createReview 테스트는 유지...

  describe('findAllReviews', () => {
    it('should return all reviews successfully', async () => {
      const mockRequest = {} as Request;
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const mockReviews = [mockReview];
      mockReviewRepository.findAllReviews.mockResolvedValue(mockReviews);

      await reviewController.findAllReviews(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: '리뷰 목록 가져오기 성공',
        reviews: mockReviews,
      });
    });

    it('should handle case when no reviews are found', async () => {
      const mockRequest = {} as Request;
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      mockReviewRepository.findAllReviews.mockResolvedValue([]);

      await reviewController.findAllReviews(mockRequest, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith({
        errorType: 'NOT_FOUND',
        message: '리뷰를 찾을 수 없습니다.',
        statusCode: 404,
      });
    });
  });

  describe('updateReview', () => {
    it('should update review successfully', async () => {
      const mockRequest = {
        params: { reviewId: '1' },
        body: { user_id: 1, content: 'updated content' },
      } as unknown as Request;

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const updatedMockReview = { ...mockReview, content: 'updated content' };
      mockReviewRepository.updateReview.mockResolvedValue(updatedMockReview);

      await reviewController.updateReview(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: '리뷰가 수정되었습니다.',
        review: updatedMockReview,
      });
    });

    it('should handle case when review is not found for update', async () => {
      const mockRequest = {
        params: { reviewId: '999' },
        body: { user_id: 1, content: 'updated content' },
      } as unknown as Request;

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      mockReviewRepository.updateReview.mockResolvedValue(null);

      await reviewController.updateReview(mockRequest, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith({
        errorType: 'NOT_FOUND',
        message: '리뷰를 찾을 수 없습니다.',
        statusCode: 404,
      });
    });
  });

  describe('deleteReview', () => {
    it('should delete review successfully', async () => {
      const mockRequest = {
        params: { reviewId: '1' },
        body: { user_id: 1 },
      } as unknown as Request;

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      mockReviewRepository.deleteReview.mockResolvedValue(true);

      await reviewController.deleteReview(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: '리뷰가 삭제되었습니다.',
      });
    });

    it('should handle case when review is not found for deletion', async () => {
      const mockRequest = {
        params: { reviewId: '999' },
        body: { user_id: 1 },
      } as unknown as Request;

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      mockReviewRepository.deleteReview.mockResolvedValue(false);

      await reviewController.deleteReview(mockRequest, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith({
        errorType: 'NOT_FOUND',
        message: '리뷰를 찾을 수 없습니다.',
        statusCode: 404,
      });
    });
  });

  it('should handle unexpected errors in deleteReview', async () => {
    const mockRequest = {
      params: { reviewId: '1' },
      body: { user_id: 1 },
    } as unknown as Request;

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const mockError = new Error('Unexpected error');
    mockReviewRepository.deleteReview.mockRejectedValue(mockError);

    await reviewController.deleteReview(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith({
      errorType: 'INTERNAL_SERVER_ERROR',
      message: 'INTERNAL_SERVER_ERROR',
      statusCode: 500,
    });
  });
});

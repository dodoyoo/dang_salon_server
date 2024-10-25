import { Request, Response } from 'express';
import { ReviewController } from '../src/domain/review/reviewController';
import { reviewRepository } from '../src/domain/review/reviewRepository';
import { ReviewImageRepository } from '../src/domain/review/reviewImageRepository';

jest.mock('../src/domain/review/reviewController');
jest.mock('../src/domain/review/reviewRepository');
jest.mock('../src/domain/review/reviewImageRepository');

const MockedReviewRepository = reviewRepository as jest.MockedClass<
  typeof reviewRepository
>;
const MockedReviewImageRepository = ReviewImageRepository as jest.MockedClass<
  typeof ReviewImageRepository
>;

describe('ReviewController', () => {
  let reviewController: ReviewController;
  let mockReviewRepository: InstanceType<typeof MockedReviewRepository>;
  let mockReviewImageRepository: InstanceType<typeof ReviewImageRepository>;

  beforeEach(() => {
    mockReviewRepository = new MockedReviewRepository();
    mockReviewImageRepository = new MockedReviewImageRepository();

    reviewController = new ReviewController(
      mockReviewRepository,
      mockReviewImageRepository
    );

    jest.clearAllMocks();
  });
});

import { Request, Response } from 'express';
import { CommentController } from '../src/domain/comment/commentController';
import { commentRepository } from '../src/domain/comment/commentRepository';

jest.mock('../src/domain/comment/commentRepository');

describe('CommentController', () => {
  let commentController: CommentController;
  let mockCommentRepository: jest.Mocked<commentRepository>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockCommentRepository =
      new commentRepository() as jest.Mocked<commentRepository>;
    commentController = new CommentController();
    (commentController as any).commentRepository = mockCommentRepository;
  });

  describe('createComments', () => {
    it('should return error if review not found', async () => {
      const req = {
        params: { reviewId: '1' },
        body: { content: '테스트 댓글' },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      mockCommentRepository.createComment = jest
        .fn()
        .mockRejectedValue(new Error('Review not found'));

      await commentController.createComments(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        errorType: 'INTERNAL_SERVER_ERROR',
        message: 'INTERNAL_SERVER_ERROR',
        statusCode: 500,
      });
    });

    it('should create a comment successfully', async () => {
      const req = {
        params: { reviewId: '1' },
        body: { content: '테스트 댓글' },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const mockComment = { id: 1, review_id: 1, content: '테스트 댓글' };
      mockCommentRepository.createComment = jest
        .fn()
        .mockResolvedValue(mockComment);

      await commentController.createComments(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: '댓글 작성이 완료되었습니다.',
        comment: mockComment,
      });
    });

    it('should handle error during comment creation', async () => {
      const req = {
        params: { reviewId: '1' },
        body: { content: '테스트 댓글' },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      mockCommentRepository.createComment = jest
        .fn()
        .mockRejectedValue(new Error('Failed to create comment'));

      await commentController.createComments(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        errorType: 'INTERNAL_SERVER_ERROR',
        message: 'INTERNAL_SERVER_ERROR',
        statusCode: 500,
      });
    });
  });

  describe('updateComment', () => {
    it('should return error if comment not found', async () => {
      const req = {
        params: { commentId: '1' },
        body: { review_id: '1', content: '수정된 댓글' },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      mockCommentRepository.updateComment = jest.fn().mockResolvedValue(null);

      await commentController.updateComment(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: '댓글을 찾을 수 없습니다.',
      });
    });

    it('should update a comment successfully', async () => {
      const req = {
        params: { commentId: '1' },
        body: { review_id: '1', content: '수정된 댓글' },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const mockUpdatedComment = {
        id: 1,
        review_id: 1,
        content: '수정된 댓글',
      };
      mockCommentRepository.updateComment = jest
        .fn()
        .mockResolvedValue(mockUpdatedComment);

      await commentController.updateComment(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: '댓글 수정이 완료되었습니다.',
        comment: mockUpdatedComment,
      });
    });

    it('should handle error during comment update', async () => {
      const req = {
        params: { commentId: '1' },
        body: { review_id: '1', content: '수정된 댓글' },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      mockCommentRepository.updateComment = jest
        .fn()
        .mockRejectedValue(new Error('Failed to update comment'));

      await commentController.updateComment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        errorType: 'INTERNAL_SERVER_ERROR',
        message: 'INTERNAL_SERVER_ERROR',
        statusCode: 500,
      });
    });
  });
});

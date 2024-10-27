import { Request, Response } from 'express';
import { CommentController } from '../src/domain/comment/commentController';
import { commentRepository } from '../src/domain/comment/commentRepository';

jest.mock('../src/domain/comment/commentRepository');

describe('CommentController', () => {
  let commentController: CommentController;
  let mockCommentRepository: jest.Mocked<commentRepository>;

  beforeEach(() => {
    jest.clearAllMocks();

    commentController = new CommentController();
    mockCommentRepository =
      new commentRepository() as jest.Mocked<commentRepository>;
    (commentController as any).commentRepository = mockCommentRepository;
  });
});

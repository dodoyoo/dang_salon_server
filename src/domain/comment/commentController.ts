import { Request, Response } from 'express';
import { Comment } from './commentEntity';
import { commentRepository } from './commentRepository';
import { reportErrorMessage } from '../../utils/errorHandling';

export class CommentController {
  private commentRepository: commentRepository;

  constructor() {
    this.commentRepository = new commentRepository();
  }

  public async createComments(req: Request, res: Response) {
    try {
      const { reviewId } = req.params;
      const { content } = req.body;

      const commentData: Partial<Comment> = {
        review_id: parseInt(reviewId, 10),
        content,
      };

      const comment = await this.commentRepository.createComment(commentData);
      res.status(201).json({ message: '댓글 작성이 완료되었습니다.', comment });
    } catch (err: unknown) {
      return reportErrorMessage(err, res);
    }
  }

  public async updateComment(req: Request, res: Response) {
    try {
      const { commentId } = req.params;
      const { review_id, content } = req.body;

      const updateComment = await this.commentRepository.updateComment(
        parseInt(commentId, 10),
        parseInt(review_id, 10),
        content
      );

      if (!updateComment) {
        return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
      }
      res
        .status(200)
        .json({
          message: '댓글 수정이 완료되었습니다.',
          comment: updateComment,
        });
    } catch (err: unknown) {
      return reportErrorMessage(err, res);
    }
  }
}

import { Router } from 'express';
import { CommentController } from './commentController';

const router = Router();
const commentController = new CommentController();

router.post('/stores/:reviewId/comments', (req, res) => commentController.createComments(req, res));
router.put('/stores/comments/:commentId', (req, res) => commentController.updateComment(req, res));

export default router;

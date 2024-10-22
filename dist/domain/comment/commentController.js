"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
const commentRepository_1 = require("./commentRepository");
const errorHandling_1 = require("../../utils/errorHandling");
class CommentController {
    constructor() {
        this.commentRepository = new commentRepository_1.commentRepository();
    }
    createComments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { reviewId } = req.params;
                const { content } = req.body;
                const commentData = {
                    review_id: parseInt(reviewId, 10),
                    content,
                };
                const comment = yield this.commentRepository.createComment(commentData);
                res.status(201).json({ message: '댓글 작성이 완료되었습니다.', comment });
            }
            catch (err) {
                return (0, errorHandling_1.reportErrorMessage)(err, res);
            }
        });
    }
    updateComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { commentId } = req.params;
                const { review_id, content } = req.body;
                const updateComment = yield this.commentRepository.updateComment(parseInt(commentId, 10), parseInt(review_id, 10), content);
                if (!updateComment) {
                    return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
                }
                res.status(200).json({ message: '댓글 수정이 완료되었습니다.', comment: updateComment });
            }
            catch (err) {
                return (0, errorHandling_1.reportErrorMessage)(err, res);
            }
        });
    }
}
exports.CommentController = CommentController;
//# sourceMappingURL=commentController.js.map
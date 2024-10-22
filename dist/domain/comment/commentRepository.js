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
exports.commentRepository = void 0;
const dataSource_1 = require("../../models/dataSource");
const commentEntity_1 = require("./commentEntity");
class commentRepository {
    constructor(dataSource) {
        this.repository = (dataSource || dataSource_1.AppDataSource).getRepository(commentEntity_1.Comment);
    }
    createComment(commentData) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = this.repository.create(commentData);
            return yield this.repository.save(comment);
        });
    }
    findCommentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.findOne({
                    where: { id },
                    relations: ['review'],
                });
            }
            catch (error) {
                console.error('댓글을 찾는데 실패했습니다.', error);
                throw new Error('Failed to find comment');
            }
        });
    }
    updateComment(id, review_id, content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield this.findCommentById(id);
                if (!comment) {
                    return null;
                }
                if (comment.review.id !== review_id) {
                    throw new Error('권한이 없습니다');
                }
                comment.content = content;
                return yield this.repository.save(comment);
            }
            catch (error) {
                console.error('댓글 수정에 실패했습니다.', error);
                throw error;
            }
        });
    }
}
exports.commentRepository = commentRepository;
//# sourceMappingURL=commentRepository.js.map
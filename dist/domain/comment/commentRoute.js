"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commentController_1 = require("./commentController");
const router = (0, express_1.Router)();
const commentController = new commentController_1.CommentController();
router.post('/stores/:reviewId/comments', (req, res) => commentController.createComments(req, res));
router.put('/stores/comments/:commentId', (req, res) => commentController.updateComment(req, res));
exports.default = router;
//# sourceMappingURL=commentRoute.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
require("reflect-metadata");
const userEntity_1 = require("../user/userEntity");
const storeEntity_1 = require("../store/storeEntity");
const commentEntity_1 = require("../comment/commentEntity");
const typeorm_1 = require("typeorm");
const reviewImageEntity_1 = require("./reviewImageEntity");
let Review = class Review {
};
exports.Review = Review;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Review.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Review.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Review.prototype, "store_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Review.prototype, "like_counts", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], Review.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Review.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        nullable: true,
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Review.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => userEntity_1.User, (user) => user.reviews),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", userEntity_1.User)
], Review.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => storeEntity_1.Store, (store) => store.reviews),
    (0, typeorm_1.JoinColumn)({ name: 'store_id' }),
    __metadata("design:type", storeEntity_1.Store)
], Review.prototype, "store", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => commentEntity_1.Comment, (comments) => comments.review),
    __metadata("design:type", Array)
], Review.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reviewImageEntity_1.ReviewImage, (reviewImages) => reviewImages.review),
    __metadata("design:type", Array)
], Review.prototype, "reviewImages", void 0);
exports.Review = Review = __decorate([
    (0, typeorm_1.Entity)('reviews')
], Review);
//# sourceMappingURL=reviewEntity.js.map
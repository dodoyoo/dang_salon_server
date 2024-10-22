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
exports.ReviewImage = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const reviewEntity_1 = require("./reviewEntity");
let ReviewImage = class ReviewImage {
};
exports.ReviewImage = ReviewImage;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ReviewImage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => reviewEntity_1.Review, (review) => review.reviewImages),
    (0, typeorm_1.JoinColumn)({ name: 'review_id' }),
    __metadata("design:type", reviewEntity_1.Review)
], ReviewImage.prototype, "review", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], ReviewImage.prototype, "review_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 2048 }),
    __metadata("design:type", String)
], ReviewImage.prototype, "image_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], ReviewImage.prototype, "image_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], ReviewImage.prototype, "image_original_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], ReviewImage.prototype, "image_size", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10 }),
    __metadata("design:type", String)
], ReviewImage.prototype, "image_type", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ReviewImage.prototype, "created_at", void 0);
exports.ReviewImage = ReviewImage = __decorate([
    (0, typeorm_1.Entity)('review_images')
], ReviewImage);
//# sourceMappingURL=reviewImageEntity.js.map
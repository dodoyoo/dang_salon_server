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
exports.StoreImage = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const storeEntity_1 = require("./storeEntity");
let StoreImage = class StoreImage {
};
exports.StoreImage = StoreImage;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StoreImage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => storeEntity_1.Store, (store) => store.store_images),
    (0, typeorm_1.JoinColumn)({ name: 'store_id' }),
    __metadata("design:type", storeEntity_1.Store)
], StoreImage.prototype, "store", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], StoreImage.prototype, "store_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 2048 }),
    __metadata("design:type", String)
], StoreImage.prototype, "image_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], StoreImage.prototype, "image_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], StoreImage.prototype, "image_original_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], StoreImage.prototype, "image_size", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10 }),
    __metadata("design:type", String)
], StoreImage.prototype, "image_type", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], StoreImage.prototype, "created_at", void 0);
exports.StoreImage = StoreImage = __decorate([
    (0, typeorm_1.Entity)('store_images')
], StoreImage);
//# sourceMappingURL=storeImageEntity.js.map
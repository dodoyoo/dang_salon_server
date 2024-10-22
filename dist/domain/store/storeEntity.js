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
exports.Store = exports.DurationTime = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const storeImageEntity_1 = require("./storeImageEntity");
const storeLikeEntity_1 = require("./storeLikeEntity");
const reservationEntity_1 = require("../reservation/reservationEntity");
const reviewEntity_1 = require("../review/reviewEntity");
const userEntity_1 = require("../user/userEntity");
const storeTimeSlotEntity_1 = require("../storeTimeSlot/storeTimeSlotEntity");
var DurationTime;
(function (DurationTime) {
    DurationTime["THIRTY"] = "30";
    DurationTime["SIXTY"] = "60";
})(DurationTime || (exports.DurationTime = DurationTime = {}));
let Store = class Store {
};
exports.Store = Store;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Store.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Store.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 300 }),
    __metadata("design:type", String)
], Store.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Store.prototype, "phone_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Store.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 300 }),
    __metadata("design:type", String)
], Store.prototype, "detail", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Store.prototype, "like_counts", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", Date)
], Store.prototype, "open_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", Date)
], Store.prototype, "close_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: DurationTime, default: DurationTime.SIXTY }),
    __metadata("design:type", String)
], Store.prototype, "duration_in_minutes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", Date)
], Store.prototype, "break_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Store.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Store.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => userEntity_1.User, (user) => user.stores),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", userEntity_1.User)
], Store.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => storeLikeEntity_1.StoreLike, (storeLike) => storeLike.store),
    __metadata("design:type", Array)
], Store.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => storeImageEntity_1.StoreImage, (storeImage) => storeImage.store),
    __metadata("design:type", Array)
], Store.prototype, "store_images", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reservationEntity_1.Reservation, (reservation) => reservation.store),
    __metadata("design:type", Array)
], Store.prototype, "reservations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reviewEntity_1.Review, (review) => review.store),
    __metadata("design:type", Array)
], Store.prototype, "reviews", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => storeTimeSlotEntity_1.StoreTimeSlots, (storeTimeSlots) => storeTimeSlots.store),
    __metadata("design:type", Array)
], Store.prototype, "storeTimeSlots", void 0);
exports.Store = Store = __decorate([
    (0, typeorm_1.Entity)('stores')
], Store);
//# sourceMappingURL=storeEntity.js.map
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
exports.User = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const reservationEntity_1 = require("../reservation/reservationEntity");
const reviewEntity_1 = require("../review/reviewEntity");
const storeEntity_1 = require("../store/storeEntity");
const storeTimeSlotEntity_1 = require("../storeTimeSlot/storeTimeSlotEntity");
let User = class User {
    constructor() {
        this.is_owner = false;
        this.is_verified = false;
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: false, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 300, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "log_in_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 2048, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "profile_image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', width: 1, nullable: true, default: 0 }),
    __metadata("design:type", Boolean)
], User.prototype, "is_owner", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, length: 255 }),
    __metadata("design:type", Object)
], User.prototype, "verification_token", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', width: 1, default: 0 }),
    __metadata("design:type", Boolean)
], User.prototype, "is_verified", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], User.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        nullable: true,
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], User.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reservationEntity_1.Reservation, (reservation) => reservation.user),
    __metadata("design:type", Array)
], User.prototype, "reservations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reviewEntity_1.Review, (review) => review.user),
    __metadata("design:type", Array)
], User.prototype, "reviews", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => storeEntity_1.Store, (store) => store.user),
    __metadata("design:type", Array)
], User.prototype, "stores", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => storeTimeSlotEntity_1.StoreTimeSlots, (storeTimeSlot) => storeTimeSlot.user),
    __metadata("design:type", Array)
], User.prototype, "storeTimeSlots", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
//# sourceMappingURL=userEntity.js.map
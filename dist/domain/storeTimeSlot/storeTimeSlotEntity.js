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
exports.StoreTimeSlots = exports.StoreStatus = void 0;
require("reflect-metadata");
const storeEntity_1 = require("../store/storeEntity");
const typeorm_1 = require("typeorm");
const userEntity_1 = require("../user/userEntity");
const reservationEntity_1 = require("../reservation/reservationEntity");
var StoreStatus;
(function (StoreStatus) {
    StoreStatus["OPEN"] = "open";
    StoreStatus["CLOSE"] = "close";
})(StoreStatus || (exports.StoreStatus = StoreStatus = {}));
let StoreTimeSlots = class StoreTimeSlots {
};
exports.StoreTimeSlots = StoreTimeSlots;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StoreTimeSlots.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], StoreTimeSlots.prototype, "store_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], StoreTimeSlots.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 5 }),
    __metadata("design:type", String)
], StoreTimeSlots.prototype, "slot", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: StoreStatus, default: StoreStatus.OPEN }),
    __metadata("design:type", String)
], StoreTimeSlots.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], StoreTimeSlots.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => storeEntity_1.Store, (store) => store.storeTimeSlots),
    (0, typeorm_1.JoinColumn)({ name: 'store_id' }),
    __metadata("design:type", storeEntity_1.Store)
], StoreTimeSlots.prototype, "store", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => userEntity_1.User, (user) => user.storeTimeSlots),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", userEntity_1.User)
], StoreTimeSlots.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reservationEntity_1.Reservation, (reservations) => reservations.storeTimeSlots),
    (0, typeorm_1.JoinColumn)({ name: 'reservation_id' }),
    __metadata("design:type", Array)
], StoreTimeSlots.prototype, "reservation", void 0);
exports.StoreTimeSlots = StoreTimeSlots = __decorate([
    (0, typeorm_1.Entity)('store_time_slots')
], StoreTimeSlots);
//# sourceMappingURL=storeTimeSlotEntity.js.map
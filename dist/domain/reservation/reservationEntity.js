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
exports.Reservation = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const userEntity_1 = require("../user/userEntity");
const storeEntity_1 = require("../store/storeEntity");
const storeTimeSlotEntity_1 = require("../storeTimeSlot/storeTimeSlotEntity");
let Reservation = class Reservation {
};
exports.Reservation = Reservation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Reservation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Reservation.prototype, "store_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Reservation.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Reservation.prototype, "slot_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Reservation.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Reservation.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 5 }),
    __metadata("design:type", String)
], Reservation.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Reservation.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => storeEntity_1.Store, (store) => store.reservations),
    (0, typeorm_1.JoinColumn)({ name: 'store_id' }),
    __metadata("design:type", storeEntity_1.Store)
], Reservation.prototype, "store", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => userEntity_1.User, (user) => user.reservations),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", userEntity_1.User)
], Reservation.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => storeTimeSlotEntity_1.StoreTimeSlots, (storeTimeSlots) => storeTimeSlots.reservation),
    (0, typeorm_1.JoinColumn)({ name: 'slot_id' }),
    __metadata("design:type", storeTimeSlotEntity_1.StoreTimeSlots)
], Reservation.prototype, "storeTimeSlots", void 0);
exports.Reservation = Reservation = __decorate([
    (0, typeorm_1.Entity)('reservations')
], Reservation);
//# sourceMappingURL=reservationEntity.js.map
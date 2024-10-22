"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const userEntity_1 = require("../domain/user/userEntity");
const storeEntity_1 = require("../domain/store/storeEntity");
const storeImageEntity_1 = require("../domain/store/storeImageEntity");
const storeLikeEntity_1 = require("../domain/store/storeLikeEntity");
const reservationEntity_1 = require("../domain/reservation/reservationEntity");
const reviewEntity_1 = require("../domain/review/reviewEntity");
const commentEntity_1 = require("../domain/comment/commentEntity");
const reviewImageEntity_1 = require("../domain/review/reviewImageEntity");
const storeTimeSlotEntity_1 = require("../domain/storeTimeSlot/storeTimeSlotEntity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: true,
    synchronize: false,
    entities: [userEntity_1.User, storeEntity_1.Store, storeImageEntity_1.StoreImage, storeLikeEntity_1.StoreLike, reservationEntity_1.Reservation, reviewEntity_1.Review, commentEntity_1.Comment, reviewImageEntity_1.ReviewImage, storeTimeSlotEntity_1.StoreTimeSlots],
});
// console.log(`DB_HOST: ${process.env.DB_HOST}`);
// console.log(`DB_PORT: ${process.env.DB_PORT}`);
// console.log(`DB_USERNAME: ${process.env.DB_USERNAME}`);
// console.log(`DB_PASSWORD: ${process.env.DB_PASSWORD}`);
// console.log(`DB_DATABASE: ${process.env.DB_DATABASE}`);
//# sourceMappingURL=dataSource.js.map
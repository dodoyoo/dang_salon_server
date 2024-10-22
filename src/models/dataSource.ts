import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../domain/user/userEntity';
import { Store } from '../domain/store/storeEntity';
import { StoreImage } from '../domain/store/storeImageEntity';
import { StoreLike } from '../domain/store/storeLikeEntity';
import { Reservation } from '../domain/reservation/reservationEntity';
import { Review } from '../domain/review/reviewEntity';
import { Comment } from '../domain/comment/commentEntity';
import { ReviewImage } from '../domain/review/reviewImageEntity';
import { StoreTimeSlots } from '../domain/storeTimeSlot/storeTimeSlotEntity';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: true,
    synchronize: false,
    entities: [User, Store, StoreImage, StoreLike, Reservation, Review, Comment, ReviewImage, StoreTimeSlots],
});

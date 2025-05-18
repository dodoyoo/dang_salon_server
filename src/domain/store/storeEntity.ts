import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, JoinColumn } from 'typeorm';
import { StoreImage } from './storeImageEntity';
import { StoreLike } from './storeLikeEntity';
import { Reservation } from '../reservation/reservationEntity';
import { Review } from '../review/reviewEntity';
import { User } from '../user/userEntity';
import { StoreTimeSlots } from '../storeTimeSlot/storeTimeSlotEntity';

export enum DurationTime {
    THIRTY = '30',
    SIXTY = '60',
}

@Entity('stores')
export class Store {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 50 })
    name!: string;

    @Column({ type: 'varchar', length: 300 })
    images!: string;

    @Column({ type: 'varchar', length: 20 })
    phone_number!: string;

    @Column({ type: 'varchar', length: 100 })
    address!: string;

    @Column({ type: 'varchar', length: 300 })
    detail!: string;

    @Column({ type: 'int', default: 0 })
    like_counts!: number;

    @Column({ type: 'time' })
    open_time!: Date;

    @Column({ type: 'time' })
    close_time!: Date;

    @Column({ type: 'enum', enum: DurationTime, default: DurationTime.SIXTY })
    duration_in_minutes!: DurationTime;

    @Column({ type: 'time' })
    break_time!: Date;

    @Column({ type: 'int', nullable: false })
    main_image!: number;

    @Column({ type: 'int', nullable: true })
    user_id!: number;

    @CreateDateColumn()
    created_at!: Date;

    // user join
    @ManyToOne(() => User, (user) => user.stores)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @OneToMany(() => StoreLike, (storeLike) => storeLike.store)
    likes!: StoreLike[];

    @OneToMany(() => StoreImage, (storeImage) => storeImage.store)
    store_images!: StoreImage[];

    @OneToMany(() => Reservation, (reservation) => reservation.store)
    reservations!: Reservation[];

    @OneToMany(() => Review, (review) => review.store)
    reviews!: Review[];

    @OneToMany(() => StoreTimeSlots, (storeTimeSlots) => storeTimeSlots.store)
    storeTimeSlots!: StoreTimeSlots[];
}

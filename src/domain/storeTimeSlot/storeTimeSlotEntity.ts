import 'reflect-metadata';
import { Store } from '../store/storeEntity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../user/userEntity';
import { Reservation } from '../reservation/reservationEntity';

export enum StoreStatus {
    OPEN = 'open',
    CLOSE = 'close',
}

@Entity('store_time_slots')
export class StoreTimeSlots {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'int' })
    store_id!: number;

    @Column({ type: 'int' })
    user_id!: number;

    @Column({ type: 'varchar', length: 5 })
    slot!: string;

    @Column({ type: 'enum', enum: StoreStatus, default: StoreStatus.OPEN })
    status!: StoreStatus;

    @CreateDateColumn()
    created_at!: Date;

    @ManyToOne(() => Store, (store) => store.storeTimeSlots)
    @JoinColumn({ name: 'store_id' })
    store!: Store;

    @ManyToOne(() => User, (user) => user.storeTimeSlots)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @OneToMany(() => Reservation, (reservations) => reservations.storeTimeSlots)
    @JoinColumn({ name: 'reservation_id' })
    reservation!: Reservation[];
}

import 'reflect-metadata';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Timestamp,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { Reservation } from '../reservation/reservationEntity';
import { Review } from '../review/reviewEntity';
import { Store } from '../store/storeEntity';
import { StoreTimeSlots } from '../storeTimeSlot/storeTimeSlotEntity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    email!: string;

    @Column({ type: 'varchar', length: 300, nullable: false })
    password!: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    nickname!: string;

    @Column({ type: 'varchar', length: 20, nullable: false })
    log_in_type!: string;

    @Column({ type: 'varchar', length: 2048, nullable: true })
    profile_image?: string;

    @Column({ type: 'tinyint', width: 1, nullable: true, default: 0 })
    is_owner: boolean = true;

    @Column({ type: 'varchar', nullable: true, length: 255 })
    verification_token?: string | null;

    @Column({ type: 'tinyint', width: 1, default: 0 })
    is_verified: boolean = false;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        nullable: true,
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updated_at!: Date;

    @OneToMany(() => Reservation, (reservation) => reservation.user)
    reservations!: Reservation[];

    @OneToMany(() => Review, (review) => review.user)
    reviews!: Review[];
    // user join
    @OneToMany(() => Store, (store) => store.user)
    stores!: Store[];

    @OneToMany(() => StoreTimeSlots, (storeTimeSlot) => storeTimeSlot.user)
    storeTimeSlots!: StoreTimeSlots[];
}

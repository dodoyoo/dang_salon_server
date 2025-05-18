import 'reflect-metadata';
import { Entity, Column, CreateDateColumn, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from '../user/userEntity';
import { Store } from '../store/storeEntity';
import { StoreTimeSlots } from '../storeTimeSlot/storeTimeSlotEntity';

@Entity('reservations')
export class Reservation {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'int' })
    store_id!: number;

    @Column({ type: 'int' })
    user_id!: number;

    @Column({ type: 'int' })
    slot_id!: number;

    @Column({ type: 'varchar', length: 20 })
    note!: string;

    @Column({ type: 'date' })
    date!: Date;

    @Column({ type: 'varchar', length: 5 })
    time!: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;

    @ManyToOne(() => Store, (store) => store.reservations)
    @JoinColumn({ name: 'store_id' })
    store!: Store;

    @ManyToOne(() => User, (user) => user.reservations)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @ManyToOne(() => StoreTimeSlots, (storeTimeSlots) => storeTimeSlots.reservation)
    @JoinColumn({ name: 'slot_id' })
    storeTimeSlots!: StoreTimeSlots;
}

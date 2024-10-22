import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Store } from './storeEntity';

@Entity('store_likes')
export class StoreLike {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Store, (store) => store.likes)
    @JoinColumn({ name: 'store_id' })
    store!: Store;

    @Column({ type: 'int' })
    store_id!: number;

    @Column({ type: 'int' })
    user_id!: number;

    @CreateDateColumn()
    created_at!: Date;
}

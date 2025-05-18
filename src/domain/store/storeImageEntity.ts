import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Store } from './storeEntity';

@Entity('store_images')
export class StoreImage {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Store, (store) => store.store_images)
    @JoinColumn({ name: 'store_id' })
    store!: Store;

    @Column({ type: 'int', nullable: false })
    store_id!: number;

    @Column({ type: 'varchar', length: 2048 })
    image_url!: string;

    @Column({ type: 'varchar', length: 255 })
    image_name!: string;

    @Column({ type: 'varchar', length: 255 })
    image_original_name!: string;

    @Column({ type: 'int', default: 0 })
    image_size!: number;

    @Column({ type: 'varchar', length: 2048 })
    image_type!: string;

    @CreateDateColumn()
    created_at!: Date;
}

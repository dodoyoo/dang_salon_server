import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Review } from './reviewEntity';

@Entity('review_images')
export class ReviewImage {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Review, (review) => review.reviewImages)
    @JoinColumn({ name: 'review_id' })
    review!: Review;

    @Column({ type: 'int', nullable: false })
    review_id!: number;

    @Column({ type: 'varchar', length: 2048 })
    image_url!: string;

    @Column({ type: 'varchar', length: 255 })
    image_name!: string;

    @Column({ type: 'varchar', length: 255 })
    image_original_name!: string;

    @Column({ type: 'int', default: 0 })
    image_size!: number;

    @Column({ type: 'varchar', length: 10 })
    image_type!: string;

    @CreateDateColumn()
    created_at!: Date;
}

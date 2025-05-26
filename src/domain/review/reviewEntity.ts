import 'reflect-metadata';
import { User } from '../user/userEntity';
import { Store } from '../store/storeEntity';
import { Comment } from '../comment/commentEntity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ReviewImage } from './reviewImageEntity';

@Entity('reviews')
export class Review {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'int' })
    user_id!: number;

    @Column({ type: 'int' })
    store_id!: number;

    @Column({ type: 'int', default: 0 })
    like_counts!: number;

    @Column({ type: 'varchar', length: 200 })
    content!: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        nullable: true,
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updated_at!: Date;

    @ManyToOne(() => User, (user) => user.reviews)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @ManyToOne(() => Store, (store) => store.reviews)
    @JoinColumn({ name: 'store_id' })
    store!: Store;

    @OneToMany(() => Comment, (comments) => comments.review)
    comments!: Comment[];

    @OneToMany(() => ReviewImage, (reviewImages) => reviewImages.review)
    reviewImages!: ReviewImage[];
}

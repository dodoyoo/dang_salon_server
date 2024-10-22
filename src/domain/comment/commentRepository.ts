import { Repository } from 'typeorm';
import { AppDataSource } from '../../models/dataSource';
import { Comment } from './commentEntity';

export class commentRepository {
    private repository: Repository<Comment>;

    constructor(dataSource?: typeof AppDataSource) {
        this.repository = (dataSource || AppDataSource).getRepository(Comment);
    }

    public async createComment(commentData: Partial<Comment>): Promise<Comment> {
        const comment = this.repository.create(commentData);
        return await this.repository.save(comment);
    }

    public async findCommentById(id: number): Promise<Comment | null> {
        try {
            return await this.repository.findOne({
                where: { id },
                relations: ['review'],
            });
        } catch (error) {
            console.error('댓글을 찾는데 실패했습니다.', error);
            throw new Error('Failed to find comment');
        }
    }

    public async updateComment(id: number, review_id: number, content: string): Promise<Comment | null> {
        try {
            const comment = await this.findCommentById(id);
            if (!comment) {
                return null;
            }
            if (comment.review.id !== review_id) {
                throw new Error('권한이 없습니다');
            }

            comment.content = content;
            return await this.repository.save(comment);
        } catch (error) {
            console.error('댓글 수정에 실패했습니다.', error);
            throw error;
        }
    }
}

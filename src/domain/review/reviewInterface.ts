export interface ReviewType {
    id: number;
    store_id: number;
    user_id: number;
    like_count: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

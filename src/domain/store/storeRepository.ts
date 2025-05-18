import { QueryRunner, Repository } from 'typeorm';
import { AppDataSource } from '../../models/dataSource';
import { Store } from './storeEntity';

export class StoreRepository {
    private repository: Repository<Store>;

    constructor(dataSource?: typeof AppDataSource) {
        this.repository = (dataSource || AppDataSource).getRepository(Store);
    }

    public async findAllStores(page: number = 1, pageSize: number = 20): Promise<Store[]> {
        try {
            const stores = await this.repository
                .createQueryBuilder('store')
                .leftJoinAndSelect('store.likes', 'store_like')
                .leftJoinAndSelect('store.store_images', 'store_image')
                .select([
                    'store.id',
                    'store.name',
                    'store.images',
                    'store.phone_number',
                    'store.address',
                    'store.detail',
                    'store.like_counts',
                    'store.open_time',
                    'store.close_time',
                    'store.duration_in_minutes',
                    'store.created_at',
                    'break_time',
                    'store_image',
                    'store_like',
                ])
                .orderBy('store.created_at', 'DESC')
                .skip((page - 1) * pageSize)
                .take(pageSize)
                .getMany();
            return stores;
        } catch (error) {
            console.error('가게을 불러오는데 실패했습니다.', error);
            throw new Error('Failed to get all stores');
        }
    }

    public async getStoreDetail(storeId: string): Promise<Store | null> {
        try {
            const store = await this.repository
                .createQueryBuilder('store')
                .leftJoinAndSelect('store.likes', 'store_like')
                .leftJoinAndSelect('store.store_images', 'store_image')
                .select([
                    'store.id',
                    'store.name',
                    'store.images',
                    'store.phone_number',
                    'store.address',
                    'store.detail',
                    'store.like_counts',
                    'store.open_time',
                    'store.close_time',
                    'store.duration_in_minutes',
                    'break_time',
                    'store_image',
                    'store_like',
                ])
                .orderBy('store.created_at', 'ASC')
                .where('store.id = :storeId', { storeId })
                .getOne();

            return store;
        } catch (error) {
            console.error('가게을 불러오는데 실패했습니다.', error);
            throw new Error('Failed to get stores');
        }
    }
    // 가게 등록 API
    public async createStore(storeData: Partial<Store>, userId: number, queryRunner: QueryRunner): Promise<Store> {
        const addStore = queryRunner.manager.create(Store, { ...storeData, user: { id: userId } });
        return await queryRunner.manager.save(addStore);
    }
}

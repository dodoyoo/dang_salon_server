import { QueryRunner, Repository } from 'typeorm';
import { AppDataSource } from '../../models/dataSource';
import { StoreImage } from './storeImageEntity';

// 이미지 업로드
export class StoreImageRepository {
    private repository: Repository<StoreImage>;

    constructor(dataSource?: typeof AppDataSource) {
        this.repository = (dataSource || AppDataSource).getRepository(StoreImage);
    }

    public async createStoreImages(
        storeImageListData: Partial<StoreImage>[],
        queryRunner: QueryRunner,
    ): Promise<StoreImage[]> {
        const addStoreImages = storeImageListData.map((imageData) => {
            return queryRunner.manager.create(StoreImage, imageData);
        });

        return await queryRunner.manager.save(addStoreImages);
    }
}

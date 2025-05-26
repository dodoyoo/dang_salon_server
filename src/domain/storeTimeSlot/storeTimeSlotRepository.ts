import { QueryRunner, Repository } from 'typeorm';
import { AppDataSource } from '../../models/dataSource';
import { StoreTimeSlots } from './storeTimeSlotEntity';

export class StoreTimeSlotRepository {
    private repository: Repository<StoreTimeSlots>;

    constructor(dataSource?: typeof AppDataSource) {
        this.repository = (dataSource || AppDataSource).getRepository(StoreTimeSlots);
    }

    public async getAllTime(storeId: string): Promise<StoreTimeSlots[]> {
        try {
            const timeSlots = await this.repository
                .createQueryBuilder('store_time_slots')
                .select(['store_time_slots.id', 'store_time_slots.slot', 'store_time_slots.status'])
                .where('store_time_slots.store_id = :storeId', { storeId })
                .orderBy('store_time_slots.slot', 'ASC')
                .getMany();

            return timeSlots;
        } catch (error) {
            console.error('시간 정보를 불러오는데 실패했습니다.', error);
            throw new Error('Fail to get store time slot');
        }
    }
    // 시간 등록
    public async createTimeSlot(
        timeSlotData: Partial<StoreTimeSlots>[],
        userId: number,
        storeId: number,
        queryRunner: QueryRunner,
    ): Promise<StoreTimeSlots[]> {
        const addTimeSlot = timeSlotData.map((slot) => {
            return queryRunner.manager.create(StoreTimeSlots, {
                ...slot,
                user: { id: userId },
                store: { id: storeId },
            });
        });
        return await queryRunner.manager.save(addTimeSlot);
    }
}

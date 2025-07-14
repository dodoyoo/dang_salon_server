import { Request, Response } from 'express';
import { reportErrorMessage } from '../../utils/errorHandling';
import { StoreRepository } from './storeRepository';
import { UserRepository } from '../user/userRepository';
import { StoreImageRepository } from './storeImageRepository';
import { StoreTimeSlotRepository } from '../storeTimeSlot/storeTimeSlotRepository';
import { Store } from './storeEntity';
import { StoreImage } from './storeImageEntity';
import { StoreTimeSlots } from '../storeTimeSlot/storeTimeSlotEntity';
import {
  PropertyRequiredError,
  ValidationError,
} from '../../utils/customError';
import { AppDataSource } from '../../models/dataSource';
import redis from '../../utils/redis';

export class StoreController {
  private storeRepository: StoreRepository;
  private userRepository: UserRepository;
  private storeImageRepository!: StoreImageRepository;
  private storeTimeSlotRepository!: StoreTimeSlotRepository;

  constructor(
    storeRepository: StoreRepository,
    userRepository: UserRepository,
    storeImageRepository: StoreImageRepository,
    storeTimeSlotRepository: StoreTimeSlotRepository
  ) {
    this.storeRepository = storeRepository;
    this.userRepository = userRepository;
    this.storeImageRepository = storeImageRepository;
    this.storeTimeSlotRepository = storeTimeSlotRepository;
  }
  // 모든 가게 가져오기
  public async findAllStores(req: Request, res: Response) {
    try {
      const cacheKey = 'all_stores';

      const cachedStores = await redis.get(cacheKey);
      if (cachedStores) {
        const stores = JSON.parse(cachedStores);
        return res
          .status(200)
          .json({ message: '목록 가져오기 성공(캐시)', stores });
      }
      const stores: Store[] = await this.storeRepository.findAllStores();

      if (stores.length === 0) {
        const err = new PropertyRequiredError('가게이 존재하지 않습니다.');
        return reportErrorMessage(err, res);
      }
      await redis.setex(cacheKey, 3600, JSON.stringify(stores));
      res.status(200).json({ message: '목록 가져오기 성공', stores });
    } catch (err: unknown) {
      return reportErrorMessage(err, res);
    }
  }

  // 가게 detail 가져오기
  public async getStoreDetail(req: Request, res: Response) {
    try {
      const storeId: string = req.params.id;
      if (!storeId) {
        const err = new PropertyRequiredError('가게 ID가 필요합니다.');
        return reportErrorMessage(err, res);
      }

      const store: Store | null = await this.storeRepository.getStoreDetail(
        storeId
      );
      if (!store) {
        const err = new ValidationError(
          '가게을 찾을 수 없습니다.',
          'NOTFOUND',
          404
        );
        return reportErrorMessage(err, res);
      } else {
        res.status(200).json({ message: '가게 불러오기 성공.', store });
      }
    } catch (err: unknown) {
      return reportErrorMessage(err, res);
    }
  }

  // 가게 시간 정보 가져오기

  public async findStoreTimes(req: Request, res: Response) {
    try {
      const storeId: string = req.params.id;
      if (!storeId) {
        const err = new PropertyRequiredError('가게 ID가 필요합니다.');
        return reportErrorMessage(err, res);
      }

      const timeSlots: StoreTimeSlots[] | null =
        await this.storeTimeSlotRepository.getAllTime(storeId);
      if (!timeSlots) {
        const err = new ValidationError(
          '시간 정보를 찾을 수 없습니다.',
          'NOTFOUND',
          timeSlots
        );
        return reportErrorMessage(err, res);
      } else {
        res.status(200).json({ message: '시간 정보 불러오기 성공', timeSlots });
      }
    } catch (err: unknown) {
      return reportErrorMessage(err, res);
    }
  }

  // 가게 등록 API
  public async createStore(req: Request, res: Response) {
    const queryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const {
        name,
        phone_number,
        address,
        detail,
        open_time,
        close_time,
        duration_in_minutes,
        break_time,
        slots: stringSlots,
        main_image,
      } = req.body;

      const user_id = req.user.userId;

      const slots = stringSlots?.split(',');

      const parsedUserId = parseInt(user_id, 10);
      if (isNaN(parsedUserId)) {
        throw new PropertyRequiredError('유효한 사용자 ID가 필요합니다.');
      }
      const user = await this.userRepository.findById(parseInt(user_id, 10));

      if (!user) {
        const err = new PropertyRequiredError('사용자를 찾을 수 없습니다.');
        return reportErrorMessage(err, res);
      }

      if (!slots || !Array.isArray(slots)) {
        const err = new PropertyRequiredError('시간 정보가 필요합니다.');
        return reportErrorMessage(err, res);
      }

      const storeData: Partial<Store> = {
        user_id,
        name,
        phone_number,
        address,
        detail,
        open_time,
        close_time,
        duration_in_minutes,
        break_time,
        main_image,
      };

      const newStore = await this.storeRepository.createStore(
        storeData,
        parseInt(user_id, 10),
        queryRunner
      );

      const images = req.files as (Express.Multer.File & {
        location: string;
      })[];

      const newTimeSlot = await this.storeTimeSlotRepository.createTimeSlot(
        slots.map((s) => ({ slot: s })),
        parsedUserId,
        newStore.id,
        queryRunner
      );

      const storeImageListData: Partial<StoreImage>[] = images?.map(
        (image) => ({
          image_url: image.location,
          image_name: image.originalname,
          image_original_name: image.originalname,
          image_size: image.size,
          image_type: image.mimetype,
        })
      );
      const newStoreImages = await this.storeImageRepository.createStoreImages(
        storeImageListData,
        queryRunner
      );

      const mainImage = parseInt(main_image, 10);
      if (mainImage >= 0 && mainImage < newStoreImages.length) {
        newStore.main_image = newStoreImages[mainImage].id;
        await queryRunner.manager.save(newStore);
      }

      await queryRunner.commitTransaction();
      await redis.del('all_stores');
      res.status(201).json({
        message: '가게 등록이 완료되었습니다.',
        newStore,
        newStoreImages,
        newTimeSlot,
      });
    } catch (err: unknown) {
      await queryRunner.rollbackTransaction();
      return reportErrorMessage(err, res);
    } finally {
      await queryRunner.release();
    }
  }
}

import { Repository } from 'typeorm';
import { AppDataSource } from '../../models/dataSource';
import { Reservation } from './reservationEntity';
import { User } from '../user/userEntity';
import { Store } from '../store/storeEntity';
import { PropertyRequiredError } from '../../utils/customError';

export class reservationRepository {
  private repository: Repository<Reservation>;

  constructor(dataSource?: typeof AppDataSource) {
    this.repository = (dataSource || AppDataSource).getRepository(Reservation);
  }

  public async createReservations(
    reservationData: Partial<Reservation>
  ): Promise<Reservation | false> {
    const existingReservation = await this.repository
      .createQueryBuilder('reservation')
      .innerJoin(Store, 'store', 'store.id = reservation.store_id')
      .innerJoin(User, 'user', 'user.id = reservation.user_id')
      .where('reservation.store_id = :storeId', {
        storeId: reservationData.store_id,
      })
      .andWhere('reservation.user_id = :userId', {
        userId: reservationData.user_id,
      })
      .andWhere('reservation.date = :date', { date: reservationData.date })
      .andWhere('reservation.time = :time', { time: reservationData.time })
      .getOne();

    if (existingReservation) {
      return false;
    }

    const reservation = this.repository.create(reservationData);
    return await this.repository.save(reservation);
  }

  // 예약 취소 API
  public async deleteReservations(reservationId: number): Promise<boolean> {
    const reservation = await this.repository.findOneBy({ id: reservationId });

    if (!reservation) {
      return false;
    }
    await this.repository.remove(reservation);
    return true;
  }

  // 예약 정보 api
  public async getReservation(
    storeId: string,
    startDate: string,
    endDate: string
  ): Promise<Reservation[]> {
    return await this.repository
      .createQueryBuilder('reservation')
      .where('reservation.store_id = :storeId', { storeId })
      .andWhere('reservation.date between :startDate and :endDate', {
        startDate,
        endDate,
      })
      .select([
        'reservation.id',
        'reservation.date',
        'reservation.time',
        'reservation.slot_id',
      ])
      .getMany();
  }
}

// import { Request, Response } from 'express';
// import { reportErrorMessage } from '../../utils/errorHandling';
// import { StoreTimeSlotRepository } from './storeTimeSlotRepository';
// import { StoreTimeSlots } from './storeTimeSlotEntity';
// import { PropertyRequiredError, ValidationError } from '../../utils/customError';

// export class StoreTimeSlotController {
//     private storeTimeSlotRepository: StoreTimeSlotRepository;

//     constructor() {
//         this.storeTimeSlotRepository = new StoreTimeSlotRepository();
//     }

//     public async findStoreTimes(req: Request, res: Response) {
//         try {
//             const storeId: string = req.params.id;
//             if (!storeId) {
//                 const err = new PropertyRequiredError('가게 ID가 필요합니다.');
//                 return reportErrorMessage(err, res);
//             }

//             const timeSlots: StoreTimeSlots[] | null = await this.storeTimeSlotRepository.getAllTime(storeId);
//             if (!timeSlots) {
//                 const err = new ValidationError('시간 정보를 찾을 수 없습니다.', 'NOTFOUND', timeSlots);
//                 return reportErrorMessage(err, res);
//             } else {
//                 res.status(200).json({ message: '시간 정보 불러오기 성공', timeSlots });
//             }
//         } catch (err: unknown) {
//             return reportErrorMessage(err, res);
//         }
//     }
// }

// // store 안에 넣기
// // repository는 timSlots을 바라볼 수 있도록
// // router 수정

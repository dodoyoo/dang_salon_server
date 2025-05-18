export enum StoreStatus {
    OPEN = 'open',
    CLOSE = 'close',
}

export interface StoreTimeSlotType {
    id: number;
    store_id: number;
    slot: string;
    status: StoreStatus;
    createdAt: Date;
}

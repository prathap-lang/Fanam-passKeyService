import { BaseResTransaction } from 'app/transaction/transaction.entity';
import { BaseResponse } from 'utils';
import { OrderStatus } from '../../utils/common.enum';
export declare class BaseResOrder {
    order_id: string;
    order_no: string;
    amount: number;
    razorpay_order_id: string;
    order_status: OrderStatus;
    payment_status: string;
    transaction_id: string;
    payment_id: string | null;
    user_id: string;
}
export declare class EntityCreateOrder extends BaseResponse {
    result: BaseResOrder;
}
declare class BaseResponseOrder {
    order_id: string;
    order_no: string;
    amount: number;
    razorpay_order_id: string;
    order_status: string;
    payment_status: string;
    transaction_id: string;
    payment_id: string;
    user_id: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    transaction: BaseResTransaction;
    payment: string;
}
export declare class EntityFetchOrder extends BaseResponse {
    result: BaseResponseOrder;
}
export {};

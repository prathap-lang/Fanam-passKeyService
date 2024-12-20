import { BaseResBankAccount } from 'app/bank-account/bank-account.entity';
import { EntityAttachment } from 'app/file-upload/file-upload.entity';
import { BaseResCountry } from 'app/location/entity';
import { BaseResOrder } from 'app/order/order.entity';
import { BaseResRecipient } from 'app/recipient/recipient.entity';
import { BaseResUser } from 'app/user/user.entity';
import { BaseResponse, TypePurpose } from 'utils';
export declare class BaseResTransaction {
    transaction_id: string;
    sender_account_type: string;
    recipient_account_type: string;
    source_country: BaseResCountry;
    destination_country: BaseResCountry;
    source_amount: number;
    destination_amount: number;
    markup_fee: number;
    purpose: TypePurpose;
    reason: string;
    status: string;
    recipient: BaseResRecipient;
    beneficiary: BaseResBankAccount;
    order: BaseResOrder;
    created_by: BaseResUser;
    invoice: EntityAttachment[];
    reconciliation_report: EntityAttachment;
    beneficiary_id: string;
}
declare const GetAllResTransaction_base: import("@nestjs/common").Type<Pick<BaseResTransaction, "transaction_id" | "destination_amount" | "markup_fee" | "purpose" | "reason" | "status" | "source_country" | "destination_country" | "source_amount">>;
export declare class GetAllResTransaction extends GetAllResTransaction_base {
}
declare const DeleteResTransaction_base: import("@nestjs/common").Type<Pick<BaseResTransaction, "transaction_id">>;
export declare class DeleteResTransaction extends DeleteResTransaction_base {
}
export declare class EntityGetTransactionList extends BaseResponse {
    result: GetAllResTransaction[];
}
export declare class EntityGetTransaction extends BaseResponse {
    result: BaseResTransaction;
}
export declare class EntityCreateTransaction extends BaseResponse {
    result: BaseResTransaction;
}
export declare class EntityUpdateTransaction extends BaseResponse {
    result: BaseResTransaction;
}
export declare class EntityDeleteTransaction extends BaseResponse {
    result: DeleteResTransaction;
}
export {};

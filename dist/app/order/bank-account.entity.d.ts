import { EnumAccount } from '@prisma/client';
import { BaseResponse } from 'utils';
declare const BaseResBankAccount_base: {
    new (...args: any[]): {
        [x: string]: any;
        email: string;
        phone_no: string;
    };
} & {
    new (): {};
};
export declare class BaseResBankAccount extends BaseResBankAccount_base {
    bank_account_id: string;
    account_holder: string;
    account_no: string;
    iban_no: string;
    swift_code: string;
    routing_code: string;
    bank_name: string;
    branch_code: string;
    branch_address: string;
    account_type: EnumAccount;
}
declare const GetAllResBankAccount_base: import("@nestjs/common").Type<Pick<BaseResBankAccount, "bank_account_id" | "account_holder" | "account_no">>;
export declare class GetAllResBankAccount extends GetAllResBankAccount_base {
}
declare const DeleteResBankAccount_base: import("@nestjs/common").Type<Pick<BaseResBankAccount, "bank_account_id">>;
export declare class DeleteResBankAccount extends DeleteResBankAccount_base {
}
export declare class EntityGetBankAccountList extends BaseResponse {
    result: GetAllResBankAccount[];
}
export declare class EntityGetBankAccount extends BaseResponse {
    result: BaseResBankAccount;
}
export declare class EntityCreateBankAccount extends BaseResponse {
    result: BaseResBankAccount;
}
export declare class EntityUpdateBankAccount extends BaseResponse {
    result: BaseResBankAccount;
}
export declare class EntityDeleteBankAccount extends BaseResponse {
    result: DeleteResBankAccount;
}
export {};

import { BaseResBankAccount } from 'app/bank-account/bank-account.entity';
import { BaseResponse } from 'utils';
declare const BaseResRecipient_base: {
    new (...args: any[]): {
        [x: string]: any;
        address: string;
        country: import("../location/entity").BaseResCountry;
        state: string;
        city: string;
        zip_code: string;
    };
} & {
    new (...args: any[]): {
        [x: string]: any;
        email: string;
        phone_no: string;
    };
} & {
    new (): {};
};
export declare class BaseResRecipient extends BaseResRecipient_base {
    recipient_id: string;
    recipient_account_type: string;
    first_name: string;
    last_name: string;
    business_name: string;
    relationship: string;
    is_same_person: boolean;
    bank_account: BaseResBankAccount;
}
declare const GetAllResRecipient_base: import("@nestjs/common").Type<Pick<BaseResRecipient, "recipient_id" | "first_name" | "last_name">>;
export declare class GetAllResRecipient extends GetAllResRecipient_base {
}
declare const DeleteResRecipient_base: import("@nestjs/common").Type<Pick<BaseResRecipient, "recipient_id">>;
export declare class DeleteResRecipient extends DeleteResRecipient_base {
}
export declare class EntityGetRecipientList extends BaseResponse {
    result: GetAllResRecipient[];
}
export declare class EntityGetRecipient extends BaseResponse {
    result: BaseResRecipient;
}
export declare class EntityCreateRecipient extends BaseResponse {
    result: BaseResRecipient;
}
export declare class EntityUpdateRecipient extends BaseResponse {
    result: BaseResRecipient;
}
export declare class EntityDeleteRecipient extends BaseResponse {
    result: DeleteResRecipient;
}
export {};

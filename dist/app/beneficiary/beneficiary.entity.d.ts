import { BaseResponse } from 'utils';
declare const BaseResBeneficiary_base: {
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
export declare class BaseResBeneficiary extends BaseResBeneficiary_base {
    beneficiary_id: string;
    first_name: string;
    last_name: string;
    relationship: string;
    notes: string;
}
declare const GetAllResBeneficiary_base: import("@nestjs/common").Type<Pick<BaseResBeneficiary, "beneficiary_id" | "first_name" | "last_name">>;
export declare class GetAllResBeneficiary extends GetAllResBeneficiary_base {
}
declare const DeleteResBeneficiary_base: import("@nestjs/common").Type<Pick<BaseResBeneficiary, "beneficiary_id">>;
export declare class DeleteResBeneficiary extends DeleteResBeneficiary_base {
}
export declare class EntityGetBeneficiaryList extends BaseResponse {
    result: GetAllResBeneficiary[];
}
export declare class EntityGetBeneficiary extends BaseResponse {
    result: BaseResBeneficiary;
}
export declare class EntityCreateBeneficiary extends BaseResponse {
    result: BaseResBeneficiary;
}
export declare class EntityUpdateBeneficiary extends BaseResponse {
    result: BaseResBeneficiary;
}
export declare class EntityDeleteBeneficiary extends BaseResponse {
    result: DeleteResBeneficiary;
}
export {};

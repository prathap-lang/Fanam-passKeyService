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
export declare class EntityCreateHandshakeWithBank extends BaseResponse {
    result: BaseResBeneficiary;
}
export {};

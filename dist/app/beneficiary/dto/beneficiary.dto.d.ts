declare const CreateBeneficiaryDto_base: {
    new (...args: any[]): {
        [x: string]: any;
        email: string;
        phone_no: string;
    };
} & {
    new (): {};
};
export declare class CreateBeneficiaryDto extends CreateBeneficiaryDto_base {
    first_name: string;
    last_name: string;
    relationship: string;
    account_no: string;
    address: string;
    notes: string;
    country_id: number;
    state_id: number;
    city_id: number;
    zip_code: string;
}
declare const UpdateBeneficiaryDto_base: import("@nestjs/common").Type<Partial<CreateBeneficiaryDto>>;
export declare class UpdateBeneficiaryDto extends UpdateBeneficiaryDto_base {
}
export {};

import { RecipientBankAccount } from 'app/bank-account/dto';
import { AccountType } from 'utils';
declare const CreateRecipientDto_base: {
    new (...args: any[]): {
        [x: string]: any;
        address_line_1: string;
        address_line_2: string;
        country_id: number;
        state_id: number;
        city_id: number;
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
export declare class CreateRecipientDto extends CreateRecipientDto_base {
    recipient_account_type: AccountType;
    first_name: string;
    last_name: string;
    business_name: string;
    id_issued_country_id: number;
    id_type: string;
    id_number: string;
    is_send_email: boolean;
    bank_account: RecipientBankAccount;
}
declare const UpdateRecipientDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateRecipientDto>>;
export declare class UpdateRecipientDto extends UpdateRecipientDto_base {
}
export {};

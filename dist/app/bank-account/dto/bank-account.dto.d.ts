import { BankAccountType, BankCodeType } from 'utils';
export declare class CreateBankAccountDto {
    account_holder: string;
    account_no: string;
    iban_no: string;
    swift_code: string;
    routing_code: string;
    bsb_code: string;
    bank_name: string;
    branch_code: string;
    bank_code_type: BankCodeType;
    branch_address: string;
    account_type: BankAccountType;
}
export declare class CreateRecipientBankAccount extends CreateBankAccountDto {
    account_holer_id: string;
}
declare const RecipientBankAccount_base: import("@nestjs/common").Type<Omit<CreateBankAccountDto, "account_holder">>;
export declare class RecipientBankAccount extends RecipientBankAccount_base {
}
declare const UpdateBankDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateBankAccountDto>>;
export declare class UpdateBankDto extends UpdateBankDto_base {
}
export {};

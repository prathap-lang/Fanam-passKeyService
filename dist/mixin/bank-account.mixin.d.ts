import { BankAccountType } from 'utils';
import { MixinConstructor } from './base.mixin';
export declare function WithDtoBankAccount<TBase extends MixinConstructor>(Base: TBase): {
    new (...args: any[]): {
        [x: string]: any;
        account_no: string;
        iban_no: string;
        swift_code: string;
        routing_code: string;
        bank_name: string;
        branch_code: string;
        branch_address: string;
        account_type: BankAccountType;
    };
} & TBase;
declare const BankAccountDto_base: {
    new (...args: any[]): {
        [x: string]: any;
        account_no: string;
        iban_no: string;
        swift_code: string;
        routing_code: string;
        bank_name: string;
        branch_code: string;
        branch_address: string;
        account_type: BankAccountType;
    };
} & {
    new (): {};
};
export declare class BankAccountDto extends BankAccountDto_base {
}
export {};

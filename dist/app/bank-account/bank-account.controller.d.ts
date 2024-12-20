import { BaseResUser } from 'app/user/user.entity';
import { AppResponse } from 'utils';
import { BankAccountService } from './bank-account.service';
import { CreateRecipientBankAccount, UpdateBankDto } from './dto';
export declare class BankAccountController {
    private readonly bankService;
    constructor(bankService: BankAccountService);
    createRecipientBankAccount(createRecipientBankAccount: CreateRecipientBankAccount, user: BaseResUser): Promise<AppResponse<{
        recipient: {
            first_name: string;
            last_name: string;
            email: string;
            recipient_id: string;
        };
    } & {
        account_id: string;
        account_no: string;
        account_holder: string;
        iban_no: string;
        swift_code: string;
        bsb_code: string;
        routing_code: string;
        bank_name: string;
        branch_code: string;
        bank_code_type: import("@prisma/client").$Enums.EnumBankCodeType;
        branch_address: string;
        account_type: import("@prisma/client").$Enums.EnumBankAccountType;
        recipient_id: string;
        created_by_id: string;
        created_at: Date;
        updated_at: Date;
    }>>;
    findAll(): Promise<AppResponse<({
        recipient: {
            first_name: string;
            last_name: string;
            email: string;
            recipient_id: string;
        };
    } & {
        account_id: string;
        account_no: string;
        account_holder: string;
        iban_no: string;
        swift_code: string;
        bsb_code: string;
        routing_code: string;
        bank_name: string;
        branch_code: string;
        bank_code_type: import("@prisma/client").$Enums.EnumBankCodeType;
        branch_address: string;
        account_type: import("@prisma/client").$Enums.EnumBankAccountType;
        recipient_id: string;
        created_by_id: string;
        created_at: Date;
        updated_at: Date;
    })[]>>;
    recipientBankAccountDetail(account_id: string): Promise<AppResponse<{
        recipient: {
            first_name: string;
            last_name: string;
            email: string;
            recipient_id: string;
        };
    } & {
        account_id: string;
        account_no: string;
        account_holder: string;
        iban_no: string;
        swift_code: string;
        bsb_code: string;
        routing_code: string;
        bank_name: string;
        branch_code: string;
        bank_code_type: import("@prisma/client").$Enums.EnumBankCodeType;
        branch_address: string;
        account_type: import("@prisma/client").$Enums.EnumBankAccountType;
        recipient_id: string;
        created_by_id: string;
        created_at: Date;
        updated_at: Date;
    }>>;
    update(account_id: string, updateBankDto: UpdateBankDto): Promise<AppResponse<{
        recipient: {
            first_name: string;
            last_name: string;
            email: string;
            recipient_id: string;
        };
    } & {
        account_id: string;
        account_no: string;
        account_holder: string;
        iban_no: string;
        swift_code: string;
        bsb_code: string;
        routing_code: string;
        bank_name: string;
        branch_code: string;
        bank_code_type: import("@prisma/client").$Enums.EnumBankCodeType;
        branch_address: string;
        account_type: import("@prisma/client").$Enums.EnumBankAccountType;
        recipient_id: string;
        created_by_id: string;
        created_at: Date;
        updated_at: Date;
    }>>;
}

import { BaseResUser } from 'app/user/user.entity';
import { AppResponse } from 'utils';
import { BankAccountService } from './bank-account.service';
import { CreateRecipientBankAccount, UpdateBankDto } from './dto';
export declare class BankAccountController {
    private readonly bankService;
    constructor(bankService: BankAccountService);
    createRecipientBankAccount(createRecipientBankAccount: CreateRecipientBankAccount, user: BaseResUser): Promise<AppResponse<{
        recipient: {
            email: string;
            recipient_id: string;
            first_name: string;
            last_name: string;
        };
    } & {
        account_id: string;
        account_no: string;
        account_holder: string;
        iban_no: string;
        swift_code: string;
        routing_code: string;
        bank_name: string;
        branch_code: string;
        branch_address: string;
        account_type: import("@prisma/client").$Enums.EnumAccount;
        recipient_id: string;
        created_by_id: string;
        created_at: Date;
        updated_at: Date;
    }>>;
    findAll(): Promise<AppResponse<({
        recipient: {
            email: string;
            recipient_id: string;
            first_name: string;
            last_name: string;
        };
    } & {
        account_id: string;
        account_no: string;
        account_holder: string;
        iban_no: string;
        swift_code: string;
        routing_code: string;
        bank_name: string;
        branch_code: string;
        branch_address: string;
        account_type: import("@prisma/client").$Enums.EnumAccount;
        recipient_id: string;
        created_by_id: string;
        created_at: Date;
        updated_at: Date;
    })[]>>;
    myBankAccounts(user: BaseResUser): Promise<AppResponse<({
        created_by: {
            email: string;
            first_name: string;
            last_name: string;
            user_id: string;
        };
    } & {
        account_id: string;
        account_no: string;
        account_type: import("@prisma/client").$Enums.EnumAccount;
        created_by_id: string;
        created_at: Date;
        updated_at: Date;
    })[]>>;
    recipientBankAccountDetail(account_id: string): Promise<AppResponse<{
        recipient: {
            email: string;
            recipient_id: string;
            first_name: string;
            last_name: string;
        };
    } & {
        account_id: string;
        account_no: string;
        account_holder: string;
        iban_no: string;
        swift_code: string;
        routing_code: string;
        bank_name: string;
        branch_code: string;
        branch_address: string;
        account_type: import("@prisma/client").$Enums.EnumAccount;
        recipient_id: string;
        created_by_id: string;
        created_at: Date;
        updated_at: Date;
    }>>;
    senderBankAccountDetail(account_id: string): Promise<AppResponse<{
        created_by: {
            email: string;
            first_name: string;
            last_name: string;
            user_id: string;
        };
    } & {
        account_id: string;
        account_no: string;
        account_type: import("@prisma/client").$Enums.EnumAccount;
        created_by_id: string;
        created_at: Date;
        updated_at: Date;
    }>>;
    update(account_id: string, updateBankDto: UpdateBankDto): Promise<AppResponse<{
        recipient: {
            email: string;
            recipient_id: string;
            first_name: string;
            last_name: string;
        };
    } & {
        account_id: string;
        account_no: string;
        account_holder: string;
        iban_no: string;
        swift_code: string;
        routing_code: string;
        bank_name: string;
        branch_code: string;
        branch_address: string;
        account_type: import("@prisma/client").$Enums.EnumAccount;
        recipient_id: string;
        created_by_id: string;
        created_at: Date;
        updated_at: Date;
    }>>;
}

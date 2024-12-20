import { SenderBankAccount } from '@prisma/client';
import { BaseResUser } from 'app/user/user.entity';
import { PrismaService } from 'prisma/prisma.service';
import { CreateRecipientBankAccount, UpdateBankDto } from './dto';
export declare class BankAccountService {
    private prisma;
    constructor(prisma: PrismaService);
    createRecipientBankAccount({ account_holder, account_no, iban_no, swift_code, routing_code, bank_name, branch_code, branch_address, account_type, account_holer_id, }: CreateRecipientBankAccount, { user_id }: BaseResUser): Promise<{
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
    }>;
    createSenderBankAccount({ account_no, account_type }: SenderBankAccount, { user_id }: BaseResUser): Promise<{
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
    }>;
    findAll(): Promise<({
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
    })[]>;
    myAccounts({ user_id }: BaseResUser): Promise<({
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
    })[]>;
    recipientBankAccountDetail(account_id: string): Promise<{
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
    }>;
    senderBankAccountDetail(account_id: string): Promise<{
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
    }>;
    update(account_id: string, { account_holder, account_no, iban_no, swift_code, routing_code, bank_name, branch_code, branch_address, account_type, }: UpdateBankDto): Promise<{
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
    }>;
}

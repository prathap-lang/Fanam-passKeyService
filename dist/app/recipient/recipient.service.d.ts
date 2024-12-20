import { BaseResUser } from 'app/user/user.entity';
import { AzureHelper } from 'helper';
import { PrismaService } from 'prisma/prisma.service';
import { AccountType } from 'utils';
import { CreateRecipientDto, UpdateRecipientDto } from './dto/recipient.dto';
export declare class RecipientService {
    private readonly prisma;
    private readonly azure;
    constructor(prisma: PrismaService, azure: AzureHelper);
    create(body: CreateRecipientDto, user: BaseResUser): Promise<{
        country: {
            country_id: number;
            country_name: string;
            iso3: string;
            iso2: string;
            emojiU: string;
            phone_code: string;
            currency: string;
        };
        state: {
            state_id: number;
            state_name: string;
        };
        city: {
            city_id: number;
            city_name: string;
        };
        id_issued_country: {
            country_id: number;
            country_name: string;
            iso3: string;
            iso2: string;
            emojiU: string;
            phone_code: string;
            currency: string;
        };
        bank_account: {
            account_type: import("@prisma/client").$Enums.EnumBankAccountType;
            account_no: string;
            account_id: string;
            account_holder: string;
            iban_no: string;
            swift_code: string;
            bsb_code: string;
            routing_code: string;
            bank_name: string;
            branch_code: string;
            bank_code_type: import("@prisma/client").$Enums.EnumBankCodeType;
            branch_address: string;
        };
    } & {
        recipient_id: string;
        recipient_account_type: import("@prisma/client").$Enums.EnumAccount;
        first_name: string;
        last_name: string;
        business_name: string;
        email: string;
        phone_no: string;
        address_line_1: string;
        address_line_2: string;
        id_type: string;
        id_number: string;
        id_issued_country_id: number;
        country_id: number;
        state_id: number;
        city_id: number;
        zip_code: string;
        relationship: import("@prisma/client").$Enums.EnumRelationship;
        is_same_person: boolean;
        is_send_email: boolean;
        purpose: import("@prisma/client").$Enums.EnumPurpose;
        bank_account_id: string;
        created_by_id: string;
        created_at: Date;
        updated_at: Date;
    }>;
    findAll(recipient_type: AccountType, user: BaseResUser): Promise<({
        country: {
            country_id: number;
            country_name: string;
            iso3: string;
            iso2: string;
            emojiU: string;
            phone_code: string;
            currency: string;
        };
        state: {
            state_id: number;
            state_name: string;
        };
        city: {
            city_id: number;
            city_name: string;
        };
        kyc_attachments: {
            attachment_id: string;
            file_name: string;
            mime: string;
        }[];
        id_issued_country: {
            country_id: number;
            country_name: string;
            iso3: string;
            iso2: string;
            emojiU: string;
            phone_code: string;
            currency: string;
        };
        bank_account: {
            account_type: import("@prisma/client").$Enums.EnumBankAccountType;
            account_no: string;
            account_id: string;
            account_holder: string;
            iban_no: string;
            swift_code: string;
            bsb_code: string;
            routing_code: string;
            bank_name: string;
            branch_code: string;
            bank_code_type: import("@prisma/client").$Enums.EnumBankCodeType;
            branch_address: string;
        };
    } & {
        recipient_id: string;
        recipient_account_type: import("@prisma/client").$Enums.EnumAccount;
        first_name: string;
        last_name: string;
        business_name: string;
        email: string;
        phone_no: string;
        address_line_1: string;
        address_line_2: string;
        id_type: string;
        id_number: string;
        id_issued_country_id: number;
        country_id: number;
        state_id: number;
        city_id: number;
        zip_code: string;
        relationship: import("@prisma/client").$Enums.EnumRelationship;
        is_same_person: boolean;
        is_send_email: boolean;
        purpose: import("@prisma/client").$Enums.EnumPurpose;
        bank_account_id: string;
        created_by_id: string;
        created_at: Date;
        updated_at: Date;
    })[]>;
    findOne(recipient_id: string, { user_id }: BaseResUser): Promise<{
        country: {
            country_id: number;
            country_name: string;
            iso3: string;
            iso2: string;
            emojiU: string;
            phone_code: string;
            currency: string;
        };
        state: {
            state_id: number;
            state_name: string;
        };
        city: {
            city_id: number;
            city_name: string;
        };
        kyc_attachments: {
            attachment_id: string;
            file_name: string;
            mime: string;
        }[];
        id_issued_country: {
            country_id: number;
            country_name: string;
            iso3: string;
            iso2: string;
            emojiU: string;
            phone_code: string;
            currency: string;
        };
        bank_account: {
            account_type: import("@prisma/client").$Enums.EnumBankAccountType;
            account_no: string;
            account_id: string;
            account_holder: string;
            iban_no: string;
            swift_code: string;
            bsb_code: string;
            routing_code: string;
            bank_name: string;
            branch_code: string;
            bank_code_type: import("@prisma/client").$Enums.EnumBankCodeType;
            branch_address: string;
        };
    } & {
        recipient_id: string;
        recipient_account_type: import("@prisma/client").$Enums.EnumAccount;
        first_name: string;
        last_name: string;
        business_name: string;
        email: string;
        phone_no: string;
        address_line_1: string;
        address_line_2: string;
        id_type: string;
        id_number: string;
        id_issued_country_id: number;
        country_id: number;
        state_id: number;
        city_id: number;
        zip_code: string;
        relationship: import("@prisma/client").$Enums.EnumRelationship;
        is_same_person: boolean;
        is_send_email: boolean;
        purpose: import("@prisma/client").$Enums.EnumPurpose;
        bank_account_id: string;
        created_by_id: string;
        created_at: Date;
        updated_at: Date;
    }>;
    update(recipient_id: string, { recipient_account_type, first_name, last_name, business_name, email, address_line_1, address_line_2, city_id, state_id, country_id, zip_code, is_send_email, phone_no, id_type, id_number, id_issued_country_id, bank_account, }: UpdateRecipientDto, user: BaseResUser): Promise<{
        country: {
            country_id: number;
            country_name: string;
            iso3: string;
            iso2: string;
            emojiU: string;
            phone_code: string;
            currency: string;
        };
        state: {
            state_id: number;
            state_name: string;
        };
        city: {
            city_id: number;
            city_name: string;
        };
        kyc_attachments: {
            attachment_id: string;
            file_name: string;
            mime: string;
        }[];
        id_issued_country: {
            country_id: number;
            country_name: string;
            iso3: string;
            iso2: string;
            emojiU: string;
            phone_code: string;
            currency: string;
        };
        bank_account: {
            account_type: import("@prisma/client").$Enums.EnumBankAccountType;
            account_no: string;
            account_id: string;
            account_holder: string;
            iban_no: string;
            swift_code: string;
            bsb_code: string;
            routing_code: string;
            bank_name: string;
            branch_code: string;
            bank_code_type: import("@prisma/client").$Enums.EnumBankCodeType;
            branch_address: string;
        };
    } & {
        recipient_id: string;
        recipient_account_type: import("@prisma/client").$Enums.EnumAccount;
        first_name: string;
        last_name: string;
        business_name: string;
        email: string;
        phone_no: string;
        address_line_1: string;
        address_line_2: string;
        id_type: string;
        id_number: string;
        id_issued_country_id: number;
        country_id: number;
        state_id: number;
        city_id: number;
        zip_code: string;
        relationship: import("@prisma/client").$Enums.EnumRelationship;
        is_same_person: boolean;
        is_send_email: boolean;
        purpose: import("@prisma/client").$Enums.EnumPurpose;
        bank_account_id: string;
        created_by_id: string;
        created_at: Date;
        updated_at: Date;
    }>;
}

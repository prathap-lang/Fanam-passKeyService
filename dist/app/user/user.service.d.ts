import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { BaseResUser } from './user.entity';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        user_id: string;
        customer_hash: string;
        first_name: string;
        last_name: string;
        date_of_birth: Date;
        business_name: string;
        email: string;
        country_code: string;
        phone_no: string;
        pin: string;
        account_type: import("@prisma/client").$Enums.EnumAccount;
        account_no: string;
        address_line_1: string;
        address_line_2: string;
        token: Prisma.JsonValue;
        invalidToken: Prisma.JsonValue;
        access_token: Prisma.JsonValue;
        country_id: number;
        state_id: number;
        city_id: number;
        zip_code: string;
        role_id: string;
        noOfWrongPinAttempts: number;
        status: import("@prisma/client").$Enums.EnumUserStatus;
        created_at: Date;
        updated_at: Date;
    }[]>;
    findOne(user_id: string): Promise<{
        country: {
            country_id: number;
            country_name: string;
            iso3: string;
            iso2: string;
            emoji: string;
            emojiU: string;
            phone_code: string;
            currency: string;
            currency_symbol: string;
            bankInputs: Prisma.JsonValue[];
        };
        state: {
            state_id: number;
            state_name: string;
        };
        city: {
            city_id: number;
            city_name: string;
        };
    } & {
        user_id: string;
        customer_hash: string;
        first_name: string;
        last_name: string;
        date_of_birth: Date;
        business_name: string;
        email: string;
        country_code: string;
        phone_no: string;
        pin: string;
        account_type: import("@prisma/client").$Enums.EnumAccount;
        account_no: string;
        address_line_1: string;
        address_line_2: string;
        token: Prisma.JsonValue;
        invalidToken: Prisma.JsonValue;
        access_token: Prisma.JsonValue;
        country_id: number;
        state_id: number;
        city_id: number;
        zip_code: string;
        role_id: string;
        noOfWrongPinAttempts: number;
        status: import("@prisma/client").$Enums.EnumUserStatus;
        created_at: Date;
        updated_at: Date;
    }>;
    getProfile({ user_id }: BaseResUser): Promise<any>;
    update(user_id: string, { first_name, last_name, }: UpdateUserDto): Promise<{
        country: {
            country_id: number;
            country_name: string;
            iso3: string;
            iso2: string;
            emojiU: string;
            phone_code: string;
            currency: string;
            bankInputs: Prisma.JsonValue[];
        };
        state: {
            state_id: number;
            state_name: string;
        };
        city: {
            city_id: number;
            city_name: string;
        };
    } & {
        user_id: string;
        customer_hash: string;
        first_name: string;
        last_name: string;
        date_of_birth: Date;
        business_name: string;
        email: string;
        country_code: string;
        phone_no: string;
        pin: string;
        account_type: import("@prisma/client").$Enums.EnumAccount;
        account_no: string;
        address_line_1: string;
        address_line_2: string;
        token: Prisma.JsonValue;
        invalidToken: Prisma.JsonValue;
        access_token: Prisma.JsonValue;
        country_id: number;
        state_id: number;
        city_id: number;
        zip_code: string;
        role_id: string;
        noOfWrongPinAttempts: number;
        status: import("@prisma/client").$Enums.EnumUserStatus;
        created_at: Date;
        updated_at: Date;
    }>;
    syncUser({ user_id }: BaseResUser, body: CreateUserDto): Promise<{
        country: {
            country_id: number;
            country_name: string;
            iso3: string;
            iso2: string;
            emojiU: string;
            phone_code: string;
            currency: string;
            bankInputs: Prisma.JsonValue[];
        };
        state: {
            state_id: number;
            state_name: string;
        };
        city: {
            city_id: number;
            city_name: string;
        };
    } & {
        user_id: string;
        customer_hash: string;
        first_name: string;
        last_name: string;
        date_of_birth: Date;
        business_name: string;
        email: string;
        country_code: string;
        phone_no: string;
        pin: string;
        account_type: import("@prisma/client").$Enums.EnumAccount;
        account_no: string;
        address_line_1: string;
        address_line_2: string;
        token: Prisma.JsonValue;
        invalidToken: Prisma.JsonValue;
        access_token: Prisma.JsonValue;
        country_id: number;
        state_id: number;
        city_id: number;
        zip_code: string;
        role_id: string;
        noOfWrongPinAttempts: number;
        status: import("@prisma/client").$Enums.EnumUserStatus;
        created_at: Date;
        updated_at: Date;
    }>;
}

import { AppResponse } from 'utils';
import { CreateUserDto, UpdateUserDto } from './dto';
import { BaseResUser } from './user.entity';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findUserProfile(user: BaseResUser): Promise<AppResponse<any>>;
    syncUser(body: CreateUserDto, user: BaseResUser): Promise<AppResponse<{
        country: {
            country_id: number;
            country_name: string;
            iso3: string;
            iso2: string;
            emojiU: string;
            phone_code: string;
            currency: string;
            bankInputs: import("@prisma/client/runtime/library").JsonValue[];
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
        token: import("@prisma/client/runtime/library").JsonValue;
        invalidToken: import("@prisma/client/runtime/library").JsonValue;
        access_token: import("@prisma/client/runtime/library").JsonValue;
        country_id: number;
        state_id: number;
        city_id: number;
        zip_code: string;
        role_id: string;
        noOfWrongPinAttempts: number;
        status: import("@prisma/client").$Enums.EnumUserStatus;
        created_at: Date;
        updated_at: Date;
    }>>;
    findOne(user_id: string): Promise<AppResponse<{
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
            bankInputs: import("@prisma/client/runtime/library").JsonValue[];
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
        token: import("@prisma/client/runtime/library").JsonValue;
        invalidToken: import("@prisma/client/runtime/library").JsonValue;
        access_token: import("@prisma/client/runtime/library").JsonValue;
        country_id: number;
        state_id: number;
        city_id: number;
        zip_code: string;
        role_id: string;
        noOfWrongPinAttempts: number;
        status: import("@prisma/client").$Enums.EnumUserStatus;
        created_at: Date;
        updated_at: Date;
    }>>;
    update(user_id: string, body: UpdateUserDto): Promise<AppResponse<{
        country: {
            country_id: number;
            country_name: string;
            iso3: string;
            iso2: string;
            emojiU: string;
            phone_code: string;
            currency: string;
            bankInputs: import("@prisma/client/runtime/library").JsonValue[];
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
        token: import("@prisma/client/runtime/library").JsonValue;
        invalidToken: import("@prisma/client/runtime/library").JsonValue;
        access_token: import("@prisma/client/runtime/library").JsonValue;
        country_id: number;
        state_id: number;
        city_id: number;
        zip_code: string;
        role_id: string;
        noOfWrongPinAttempts: number;
        status: import("@prisma/client").$Enums.EnumUserStatus;
        created_at: Date;
        updated_at: Date;
    }>>;
}

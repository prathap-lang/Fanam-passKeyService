import { BaseResUser } from 'app/user/user.entity';
import { PrismaService } from 'prisma/prisma.service';
import { CreateBeneficiaryDto, UpdateBeneficiaryDto } from './dto/handshake.dto';
export declare class BeneficiaryService {
    private prisma;
    constructor(prisma: PrismaService);
    create({ first_name, last_name, relationship, account_no, address, notes, zip_code, state_id, phone_no, email, country_id, city_id, }: CreateBeneficiaryDto, { user_id }: BaseResUser): Promise<{
        country: {
            country_id: number;
            country_name: string;
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
    } & {
        beneficiary_id: string;
        first_name: string;
        last_name: string;
        email: string;
        country_id: number;
        phone_no: string;
        relationship: string;
        account_no: string;
        address: string;
        notes: string;
        state_id: number;
        city_id: number;
        zip_code: string;
        created_by_id: string;
        created_at: Date;
        updated_at: Date;
    }>;
    findAll({ user_id }: BaseResUser): Promise<({
        country: {
            country_id: number;
            country_name: string;
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
    } & {
        beneficiary_id: string;
        first_name: string;
        last_name: string;
        email: string;
        country_id: number;
        phone_no: string;
        relationship: string;
        account_no: string;
        address: string;
        notes: string;
        state_id: number;
        city_id: number;
        zip_code: string;
        created_by_id: string;
        created_at: Date;
        updated_at: Date;
    })[]>;
    findOne(beneficiary_id: string, { user_id }: BaseResUser): Promise<{
        country: {
            country_id: number;
            country_name: string;
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
    } & {
        beneficiary_id: string;
        first_name: string;
        last_name: string;
        email: string;
        country_id: number;
        phone_no: string;
        relationship: string;
        account_no: string;
        address: string;
        notes: string;
        state_id: number;
        city_id: number;
        zip_code: string;
        created_by_id: string;
        created_at: Date;
        updated_at: Date;
    }>;
    update(beneficiary_id: string, { first_name, last_name, relationship, account_no, address, notes, zip_code, city_id, state_id, country_id, phone_no, email, }: UpdateBeneficiaryDto): Promise<{
        country: {
            country_id: number;
            country_name: string;
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
    } & {
        beneficiary_id: string;
        first_name: string;
        last_name: string;
        email: string;
        country_id: number;
        phone_no: string;
        relationship: string;
        account_no: string;
        address: string;
        notes: string;
        state_id: number;
        city_id: number;
        zip_code: string;
        created_by_id: string;
        created_at: Date;
        updated_at: Date;
    }>;
}

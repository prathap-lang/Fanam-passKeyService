import { BaseResUser } from 'app/user/user.entity';
import { AppResponse } from 'utils';
import { BeneficiaryService } from './beneficiary.service';
import { CreateBeneficiaryDto, UpdateBeneficiaryDto } from './dto';
export declare class BeneficiaryController {
    private readonly beneficiaryService;
    constructor(beneficiaryService: BeneficiaryService);
    create(body: CreateBeneficiaryDto, user: BaseResUser): Promise<AppResponse<{
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
    }>>;
    findAll(user: BaseResUser): Promise<AppResponse<({
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
    })[]>>;
    findOne(beneficiary_id: string, user: BaseResUser): Promise<AppResponse<{
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
    }>>;
    update(beneficiary_id: string, body: UpdateBeneficiaryDto, user: BaseResUser): Promise<AppResponse<{
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
    }>>;
}

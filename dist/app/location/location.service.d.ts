import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
export declare class LocationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getRegions(): Promise<{
        region_id: number;
        region_name: string;
        created_at: Date;
        updated_at: Date;
    }[]>;
    getRegionDetail(region_id: number): Promise<{
        region_id: number;
        region_name: string;
        created_at: Date;
        updated_at: Date;
    }>;
    getSubregions(): Promise<{
        subregion_id: number;
        subregion_name: string;
    }[]>;
    getSubregionDetail(subregion_id: number): Promise<{
        subregion_id: number;
        subregion_name: string;
    }>;
    getCountries(country_id: number): Promise<{
        country_id: number;
        country_name: string;
        iso2: string;
        emoji: string;
        emojiU: string;
        phone_code: string;
        currency: string;
        bankInputs: Prisma.JsonValue[];
    }[]>;
    findOne(country_id: number): Promise<{
        country_id: number;
        country_name: string;
        iso2: string;
        emojiU: string;
        phone_code: string;
        currency: string;
        bankInputs: Prisma.JsonValue[];
    }>;
    getStates(country_id: number): Promise<{
        state_id: number;
        state_name: string;
    }[]>;
    getCities(state_id: number): Promise<{
        city_id: number;
        city_name: string;
    }[]>;
}

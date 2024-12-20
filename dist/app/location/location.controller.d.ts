import { AppResponse } from 'utils';
import { LocationService } from './location.service';
export declare class LocationController {
    private readonly service;
    constructor(service: LocationService);
    findAllRegions(): Promise<AppResponse<{
        region_id: number;
        region_name: string;
        created_at: Date;
        updated_at: Date;
    }[]>>;
    findRegionDetail(region_id: string): Promise<AppResponse<{
        region_id: number;
        region_name: string;
        created_at: Date;
        updated_at: Date;
    }>>;
    findAllSubregions(): Promise<AppResponse<{
        subregion_id: number;
        subregion_name: string;
    }[]>>;
    findSubregionDetail(subregion_id: string): Promise<AppResponse<{
        subregion_id: number;
        subregion_name: string;
    }>>;
    findAllCountries(country_id: number): Promise<AppResponse<{
        country_id: number;
        country_name: string;
        iso2: string;
        emoji: string;
        emojiU: string;
        phone_code: string;
        currency: string;
        bankInputs: import("@prisma/client/runtime/library").JsonValue[];
    }[]>>;
    findCountryDetail(country_id: string): Promise<AppResponse<{
        country_id: number;
        country_name: string;
        iso2: string;
        emojiU: string;
        phone_code: string;
        currency: string;
        bankInputs: import("@prisma/client/runtime/library").JsonValue[];
    }>>;
    findAllStatesByCountry(country_id: string): Promise<AppResponse<{
        state_id: number;
        state_name: string;
    }[]>>;
    findStateDetail(state_id: string): Promise<AppResponse<{
        city_id: number;
        city_name: string;
    }[]>>;
}

import { BaseResponse } from 'utils';
import { BaseResCity, BaseResRegion, BaseResState, BaseResSubregion } from '../entity';
export declare class BaseResCountry {
    country_id: number;
    country_name: string;
    iso3: string;
    iso2: string;
    emoji: string;
    emojiU: string;
    numeric_code: string;
    phone_code: string;
    capital: string;
    currency: string;
    currency_name: string;
    currency_symbol: string;
    tld: string;
    native: string;
    nationality: string;
    latitude: string;
    longitude: string;
    region_id: string;
    region: BaseResRegion;
    subregion_id: string;
    subregion: BaseResSubregion;
    states: BaseResState[];
    cities: BaseResCity[];
}
declare const GetResCountries_base: import("@nestjs/common").Type<Pick<BaseResCountry, "country_id" | "country_name">>;
export declare class GetResCountries extends GetResCountries_base {
}
declare const GetResCountryDetail_base: import("@nestjs/common").Type<Omit<BaseResCountry, "subregion_id" | "region_id">>;
export declare class GetResCountryDetail extends GetResCountryDetail_base {
}
export declare class EntityGetCountries extends BaseResponse {
    result: GetResCountries[];
}
export declare class EntityGetCountryDetail extends BaseResponse {
    result: GetResCountryDetail;
}
export {};

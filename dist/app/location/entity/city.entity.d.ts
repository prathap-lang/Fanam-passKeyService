import { BaseResponse } from 'utils';
import { BaseResCountry, BaseResRegion, BaseResState, BaseResSubregion } from '../entity';
export declare class BaseResCity {
    city_id: number;
    city_name: string;
    latitude: string;
    longitude: string;
    region_id: string;
    region: BaseResRegion;
    subregion_id: string;
    subregion: BaseResSubregion;
    country_id: string;
    country: BaseResCountry;
    state_id: string;
    state: BaseResState;
}
declare const GetResCities_base: import("@nestjs/common").Type<Pick<BaseResCity, "city_id" | "city_name">>;
export declare class GetResCities extends GetResCities_base {
}
declare const GetResCityDetail_base: import("@nestjs/common").Type<Omit<BaseResCity, "country_id" | "state_id" | "subregion_id" | "region_id">>;
export declare class GetResCityDetail extends GetResCityDetail_base {
}
export declare class EntityGetCities extends BaseResponse {
    result: GetResCities[];
}
export declare class EntityGetCityDetail extends BaseResponse {
    result: GetResCityDetail;
}
export {};

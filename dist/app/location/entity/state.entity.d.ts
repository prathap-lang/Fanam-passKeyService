import { BaseResponse } from 'utils';
import { BaseResCity, BaseResCountry, BaseResRegion, BaseResSubregion } from '../entity';
export declare class BaseResState {
    state_id: number;
    state_name: string;
    state_code: string;
    latitude: string;
    longitude: string;
    type: () => string;
    region_id: string;
    region: BaseResRegion;
    subregion_id: string;
    subregion: BaseResSubregion;
    country_id: string;
    country: BaseResCountry;
    cities: BaseResCity[];
}
declare const GetResStates_base: import("@nestjs/common").Type<Pick<BaseResState, "state_id" | "state_name">>;
export declare class GetResStates extends GetResStates_base {
}
declare const GetResStateDetail_base: import("@nestjs/common").Type<Omit<BaseResState, "country_id" | "subregion_id" | "region_id">>;
export declare class GetResStateDetail extends GetResStateDetail_base {
}
export declare class EntityGetStates extends BaseResponse {
    result: GetResStates[];
}
export declare class EntityGetStateDetail extends BaseResponse {
    result: GetResStateDetail;
}
export {};

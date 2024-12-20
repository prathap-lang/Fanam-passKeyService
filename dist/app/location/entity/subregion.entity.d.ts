import { BaseResponse } from 'utils';
import { BaseResCity, BaseResCountry, BaseResRegion, BaseResState } from '../entity';
export declare class BaseResSubregion {
    subregion_id: number;
    subregion_name: string;
    region_id: number;
    region: BaseResRegion;
    countries: BaseResCountry[];
    states: BaseResState[];
    cities: BaseResCity[];
}
declare const GetResSubregions_base: import("@nestjs/common").Type<Pick<BaseResSubregion, "subregion_id" | "subregion_name">>;
export declare class GetResSubregions extends GetResSubregions_base {
}
declare const GetResSubregionDetail_base: import("@nestjs/common").Type<Omit<BaseResSubregion, "region_id">>;
export declare class GetResSubregionDetail extends GetResSubregionDetail_base {
}
export declare class EntityGetSubregions extends BaseResponse {
    result: GetResSubregions[];
}
export declare class EntityGetSubregionDetail extends BaseResponse {
    result: GetResSubregionDetail;
}
export {};

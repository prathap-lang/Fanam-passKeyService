import { BaseResponse } from 'utils';
import { BaseResCity, BaseResCountry, BaseResState } from '../entity';
export declare class BaseResRegion {
    region_id: number;
    region_name: string;
    subregions: BaseResCountry[];
    countries: BaseResCountry[];
    states: BaseResState[];
    cities: BaseResCity[];
}
declare const GetResRegions_base: import("@nestjs/common").Type<Pick<BaseResRegion, "region_id" | "region_name">>;
export declare class GetResRegions extends GetResRegions_base {
}
export declare class EntityGetRegions extends BaseResponse {
    result: GetResRegions[];
}
export declare class EntityGetRegionDetail extends BaseResponse {
    result: BaseResRegion;
}
export {};

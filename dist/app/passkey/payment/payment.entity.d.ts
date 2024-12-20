import { BaseResCountry } from 'app/location/entity';
import { BaseResponse } from 'utils';
export declare class Payment {
}
export declare class BaseResFxRate {
    source_country: BaseResCountry;
    destination_country: BaseResCountry;
    source_amount: string;
    destination_amount: string;
    conversion_rate: number;
    markup_fee: number;
    quoteId: number;
}
export declare class BaseResPopularCorridor {
    source_country: BaseResCountry;
    destination_country: BaseResCountry;
    conversion_rate: number;
}
export declare class GetResFxRate extends BaseResponse {
    result: BaseResFxRate;
}
export declare class GetResPopularCorridors extends BaseResponse {
    result: BaseResPopularCorridor[];
}

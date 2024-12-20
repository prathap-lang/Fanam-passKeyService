import { BaseResCountry } from 'app/location/entity';
import { MixinConstructor } from './base.mixin';
export declare function WithEntityAddress<TBase extends MixinConstructor>(Base: TBase): {
    new (...args: any[]): {
        [x: string]: any;
        address: string;
        country: BaseResCountry;
        state: string;
        city: string;
        zip_code: string;
    };
} & TBase;
export declare function WithDtoAddress<TBase extends MixinConstructor>(Base: TBase): {
    new (...args: any[]): {
        [x: string]: any;
        address_line_1: string;
        address_line_2: string;
        country_id: number;
        state_id: number;
        city_id: number;
        zip_code: string;
    };
} & TBase;

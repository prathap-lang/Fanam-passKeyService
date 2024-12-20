import { MixinConstructor } from './base.mixin';
export declare function WithEntityContact<TBase extends MixinConstructor>(Base: TBase): {
    new (...args: any[]): {
        [x: string]: any;
        email: string;
        phone_no: string;
    };
} & TBase;
export declare function WithDtoContact<TBase extends MixinConstructor>(Base: TBase): {
    new (...args: any[]): {
        [x: string]: any;
        email: string;
        phone_no: string;
    };
} & TBase;

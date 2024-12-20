import { Type } from '@nestjs/common';
import { TypeMime } from './common.enum';
export declare function Mixin<T extends Type<any>>(Base: T): T;
export declare function printLog(...args: any[]): void;
export declare function formatFileSize(size: number): string;
export declare function getMimeType(fileMime: string): TypeMime;

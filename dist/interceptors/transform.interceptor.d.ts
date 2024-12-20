import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export interface Response<T> {
    status_code: number;
    message: string;
    result: T;
    is_encrypted: boolean;
}
export declare class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(_: ExecutionContext, next: CallHandler): Observable<Response<T>>;
}

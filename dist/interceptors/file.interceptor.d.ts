import { CallHandler, ExecutionContext } from '@nestjs/common';
export declare class FileInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Promise<import("rxjs").Observable<any>>;
}

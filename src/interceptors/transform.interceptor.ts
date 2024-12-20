import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  status_code: number;
  message: string;
  result: T;
  is_encrypted: boolean;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(_: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map(({ message, result, is_encrypted }) => ({
        status_code: 200,
        status: 'Success',
        message,
        result,
        is_encrypted,
      })),
    );
  }
}

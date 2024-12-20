import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Observable } from 'rxjs';
export declare class SessionInterceptor implements NestInterceptor {
    private readonly prisma;
    constructor(prisma: PrismaService);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
}

import { AuthService } from 'app/auth/auth.service';
import { PrismaService } from 'prisma/prisma.service';
export declare class CronConfigService {
    private readonly prisma;
    private auth;
    constructor(prisma: PrismaService, auth: AuthService);
    tokenRemovalCron(): Promise<void>;
}

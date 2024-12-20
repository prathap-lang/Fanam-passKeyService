import { ITokenPayload } from 'model';
import { Strategy } from 'passport-jwt';
import { PrismaService } from 'prisma/prisma.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(prisma: PrismaService);
    validate(payload: ITokenPayload): Promise<{
        user_id: string;
        first_name: string;
        email: string;
        phone_no: string;
        role: {
            permissions: {
                identifier: string;
                description: string;
                created_at: Date;
                updated_at: Date;
            }[];
        } & {
            role_id: string;
            role: import("@prisma/client").$Enums.EnumUserRole;
            created_at: Date;
            updated_at: Date;
        };
    }>;
}
export {};

import { PrismaService } from 'prisma/prisma.service';
export declare class HandshakeService {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(bank_name: string): Promise<{
        bank_name: string;
        client_id: string;
        client_secret: string;
    }>;
    createTokenWithBank({ code, bank_id }: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}

import { EmailService } from 'email/email.service';
import { AzureHelper } from 'helper';
import { PrismaService } from './../prisma/prisma.service';
export declare class PdfService {
    private readonly prisma;
    private readonly azure;
    private readonly email;
    constructor(prisma: PrismaService, azure: AzureHelper, email: EmailService);
    generateUserReport(transaction_id: string, webhook: string): Promise<any>;
}

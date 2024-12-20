/// <reference types="multer" />
import { RecipientService } from 'app/recipient/recipient.service';
import { TransactionService } from 'app/transaction/transaction.service';
import { BaseResUser } from 'app/user/user.entity';
import { UserService } from 'app/user/user.service';
import { AzureHelper } from 'helper';
import { PrismaService } from 'prisma/prisma.service';
import { InvoiceDto, RecipientDto, SenderKycDto } from './file-upload.dto';
export declare class FileUploadService {
    private readonly azure;
    private readonly prisma;
    private readonly transaction;
    private readonly recipient;
    private readonly user;
    constructor(azure: AzureHelper, prisma: PrismaService, transaction: TransactionService, recipient: RecipientService, user: UserService);
    uploadInvoice(invoice: Express.Multer.File[], body: InvoiceDto, user: BaseResUser): Promise<any>;
    uploadSenderKyc(kyc: Express.Multer.File[], body: SenderKycDto, user: BaseResUser): Promise<any>;
    uploadRecipientKyc(kyc: Express.Multer.File[], body: RecipientDto, user: BaseResUser): Promise<any>;
    remove(attachment_id: string): Promise<{
        attachment_id: string;
    }>;
}

import { BaseResUser } from 'app/user/user.entity';
import { AppResponse } from 'utils';
import { InvoiceDto, RecipientDto, SenderKycDto } from './file-upload.dto';
import { FileUploadService } from './file-upload.service';
export declare class FileUploadController {
    private readonly service;
    constructor(service: FileUploadService);
    uploadInvoice(files: InvoiceDto, body: InvoiceDto, user: BaseResUser): Promise<AppResponse<any>>;
    uploadSenderKyc(files: SenderKycDto, body: SenderKycDto, user: BaseResUser): Promise<AppResponse<any>>;
    uploadRecipientKyc(files: RecipientDto, body: RecipientDto, user: BaseResUser): Promise<AppResponse<any>>;
    remove(attachment_id: string): Promise<AppResponse<{
        attachment_id: string;
    }>>;
}

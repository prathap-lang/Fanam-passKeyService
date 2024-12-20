import { IFile, IFileInput } from 'model';
import { PrismaService } from 'prisma/prisma.service';
import { TypeAzureContainers } from 'utils';
export declare class AzureHelper {
    private readonly prisma;
    private readonly blobServiceClient;
    constructor(prisma: PrismaService);
    private getBlobClient;
    uploadMultipleFiles(files: IFileInput[], containerName: TypeAzureContainers): Promise<IFile[]>;
    uploadFile(file: IFileInput, containerName: TypeAzureContainers): Promise<IFile>;
    removeFile(file_name: string, containerName: TypeAzureContainers): Promise<any>;
    generateSASUrl(fileName: string, containerName: TypeAzureContainers): string;
}

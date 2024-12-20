"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureHelper = void 0;
const storage_blob_1 = require("@azure/storage-blob");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const utils_1 = require("../utils");
const uuidv4_1 = require("uuidv4");
let AzureHelper = class AzureHelper {
    constructor(prisma) {
        this.prisma = prisma;
        const connectionString = process.env.AZURE_CONNECTION_STRING;
        if (!connectionString) {
            throw new Error('Azure Storage connection string is not defined');
        }
        this.blobServiceClient =
            storage_blob_1.BlobServiceClient.fromConnectionString(connectionString);
    }
    getBlobClient(imageName, containerName) {
        const containerClient = this.blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(imageName);
        return blockBlobClient;
    }
    async uploadMultipleFiles(files, containerName) {
        const promiseArray = [];
        files.forEach((file) => promiseArray.push(this.uploadFile(file, containerName)));
        const results = await Promise.all(promiseArray);
        return results;
    }
    async uploadFile(file, containerName) {
        const { originalname, mimetype } = file;
        const extension = file.originalname.split('.').pop();
        const mime = (0, utils_1.getMimeType)(mimetype);
        const file_name = `${mime.toUpperCase()}-${(0, uuidv4_1.uuid)()}.${extension}`;
        const blockBlobClient = this.getBlobClient(file_name, containerName);
        const response = await blockBlobClient.uploadData(file.buffer);
        (0, utils_1.printLog)('Azure Blob API Response: ', response);
        const data = { file_name, original_name: originalname, mime };
        return data;
    }
    async removeFile(file_name, containerName) {
        const blockBlobClient = this.getBlobClient(file_name, containerName);
        try {
            console.log(`Deleted blob ${file_name} successfully`);
            return await blockBlobClient.delete();
        }
        catch (error) {
            console.error(`Error deleting blob ${file_name}`, error);
            throw new Error(`Failed to delete the file: ${file_name}`);
        }
    }
    generateSASUrl(fileName, containerName) {
        const startsOn = new Date();
        const expiresOn = new Date();
        expiresOn.setMinutes(expiresOn.getMinutes() + 1);
        const storageCredential = new storage_blob_1.StorageSharedKeyCredential(process.env.AZURE_ACCOUNT_NAME, process.env.AZURE_ACCESS_KEY);
        const sasToken = (0, storage_blob_1.generateBlobSASQueryParameters)({
            containerName,
            permissions: storage_blob_1.BlobSASPermissions.parse('r'),
            startsOn,
            expiresOn,
        }, storageCredential).toString();
        const fileUrl = this.getBlobClient(fileName, containerName).url;
        return `${fileUrl}?${sasToken}`;
    }
};
exports.AzureHelper = AzureHelper;
exports.AzureHelper = AzureHelper = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AzureHelper);
//# sourceMappingURL=azure.helper.js.map
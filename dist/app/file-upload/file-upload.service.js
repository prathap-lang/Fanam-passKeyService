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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const helper_1 = require("../../helper");
const prisma_service_1 = require("../../prisma/prisma.service");
const utils_1 = require("../../utils");
let FileUploadService = class FileUploadService {
    constructor(azure, prisma, transaction, recipient, user) {
        this.azure = azure;
        this.prisma = prisma;
        this.transaction = transaction;
        this.recipient = recipient;
        this.user = user;
    }
    async uploadInvoice(invoice, body, user) {
        const { transaction_id } = body;
        (0, utils_1.printLog)(body, invoice, transaction_id, user);
        const fileDataArr = await this.azure.uploadMultipleFiles(invoice, 'invoice');
        const attachmentPromises = [];
        fileDataArr.forEach((file) => attachmentPromises.push(this.prisma.attachment.create({
            data: {
                ...file,
                container_name: 'invoice',
                invoice_transaction: { connect: { transaction_id } },
            },
        })));
        await Promise.all(attachmentPromises);
        return await this.transaction.findOne(transaction_id, user);
    }
    async uploadSenderKyc(kyc, body, user) {
        const { user_id } = user;
        const { kyc_id } = body;
        const fileDataArr = await this.azure.uploadMultipleFiles(kyc, 'sender-kyc');
        const attachmentPromises = [];
        fileDataArr.forEach((file) => attachmentPromises.push(this.prisma.attachment.create({
            data: {
                ...file,
                container_name: 'sender-kyc',
                user: { connect: { user_id } },
                senderKycDetail: { connect: { kyc_id } },
            },
        })));
        await Promise.all(attachmentPromises);
        return await this.user.getProfile(user);
    }
    async uploadRecipientKyc(kyc, body, user) {
        const { recipient_id, transaction_id } = body;
        const fileDataArr = await this.azure.uploadMultipleFiles(kyc, 'recipient-kyc');
        const attachmentPromises = [];
        fileDataArr.forEach((file) => attachmentPromises.push(this.prisma.attachment.create({
            data: {
                ...file,
                container_name: 'recipient-kyc',
                recipient: { connect: { recipient_id } },
            },
        })));
        await Promise.all(attachmentPromises);
        let result;
        if (transaction_id) {
            result = await this.transaction.findOne(transaction_id, user);
        }
        else {
            result = await this.recipient.findOne(recipient_id, user);
        }
        return result;
    }
    async remove(attachment_id) {
        const attachment = await this.prisma.attachment.findUnique({
            where: { attachment_id },
        });
        if (!attachment)
            throw new common_1.NotFoundException('Attachment not found');
        const containerName = attachment.container_name;
        const fileDataRes = await this.azure.removeFile(attachment.file_name, containerName);
        if (fileDataRes) {
            return await this.prisma.attachment.delete({
                where: { attachment_id },
                select: {
                    attachment_id: true,
                },
            });
        }
        else {
            throw new common_1.BadGatewayException('File Does Not Remove Successfully');
        }
    }
};
exports.FileUploadService = FileUploadService;
exports.FileUploadService = FileUploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [helper_1.AzureHelper,
        prisma_service_1.PrismaService, typeof (_a = typeof TransactionService !== "undefined" && TransactionService) === "function" ? _a : Object, typeof (_b = typeof RecipientService !== "undefined" && RecipientService) === "function" ? _b : Object, user_service_1.UserService])
], FileUploadService);
//# sourceMappingURL=file-upload.service.js.map
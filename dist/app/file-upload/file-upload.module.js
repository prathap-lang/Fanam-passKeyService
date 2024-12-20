"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadModule = void 0;
const common_1 = require("@nestjs/common");
const recipient_service_1 = require("app/recipient/recipient.service");
const transaction_service_1 = require("app/transaction/transaction.service");
const user_service_1 = require("../user/user.service");
const azure_helper_1 = require("../../helper/azure.helper");
const prisma_service_1 = require("../../prisma/prisma.service");
const file_upload_controller_1 = require("./file-upload.controller");
const file_upload_service_1 = require("./file-upload.service");
let FileUploadModule = class FileUploadModule {
};
exports.FileUploadModule = FileUploadModule;
exports.FileUploadModule = FileUploadModule = __decorate([
    (0, common_1.Module)({
        controllers: [file_upload_controller_1.FileUploadController],
        providers: [
            file_upload_service_1.FileUploadService,
            prisma_service_1.PrismaService,
            azure_helper_1.AzureHelper,
            transaction_service_1.TransactionService,
            user_service_1.UserService,
            recipient_service_1.RecipientService,
        ],
    })
], FileUploadModule);
//# sourceMappingURL=file-upload.module.js.map
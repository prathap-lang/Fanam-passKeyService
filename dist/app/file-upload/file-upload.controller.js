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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const user_entity_1 = require("../user/user.entity");
const decorators_1 = require("../../decorators");
const session_interceptor_1 = require("../../interceptors/session.interceptor");
const utils_1 = require("../../utils");
const file_upload_dto_1 = require("./file-upload.dto");
const file_upload_entity_1 = require("./file-upload.entity");
const file_upload_service_1 = require("./file-upload.service");
let FileUploadController = class FileUploadController {
    constructor(service) {
        this.service = service;
    }
    async uploadInvoice(files, body, user) {
        const result = await this.service.uploadInvoice(files.invoice, body, user);
        return new utils_1.AppResponse(result, 'Uploaded Invoice files successfully');
    }
    async uploadSenderKyc(files, body, user) {
        const result = await this.service.uploadSenderKyc(files.kyc, body, user);
        return new utils_1.AppResponse(result, 'Uploaded Kyc files successfully');
    }
    async uploadRecipientKyc(files, body, user) {
        const result = await this.service.uploadRecipientKyc(files.kyc, body, user);
        return new utils_1.AppResponse(result, 'Uploaded Invoice files successfully');
    }
    async remove(attachment_id) {
        const result = await this.service.remove(attachment_id);
        return new utils_1.AppResponse(result, 'File Removed  Successfully');
    }
};
exports.FileUploadController = FileUploadController;
__decorate([
    (0, common_1.Post)('invoice'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        {
            name: 'invoice',
            maxCount: 5,
        },
    ])),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: 'Upload Invoice',
        type: file_upload_dto_1.InvoiceDto,
    }),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [file_upload_dto_1.InvoiceDto,
        file_upload_dto_1.InvoiceDto,
        user_entity_1.BaseResUser]),
    __metadata("design:returntype", Promise)
], FileUploadController.prototype, "uploadInvoice", null);
__decorate([
    (0, common_1.Post)('sender-kyc'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        {
            name: 'kyc',
            maxCount: 5,
        },
    ])),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: 'Upload KYC files',
        type: file_upload_dto_1.SenderKycDto,
    }),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [file_upload_dto_1.SenderKycDto,
        file_upload_dto_1.SenderKycDto,
        user_entity_1.BaseResUser]),
    __metadata("design:returntype", Promise)
], FileUploadController.prototype, "uploadSenderKyc", null);
__decorate([
    (0, common_1.Post)('recipient-kyc'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        {
            name: 'kyc',
            maxCount: 5,
        },
    ])),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: 'Upload Recipient files',
        type: file_upload_dto_1.RecipientDto,
    }),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [file_upload_dto_1.RecipientDto,
        file_upload_dto_1.RecipientDto,
        user_entity_1.BaseResUser]),
    __metadata("design:returntype", Promise)
], FileUploadController.prototype, "uploadRecipientKyc", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete File' }),
    (0, swagger_1.ApiOkResponse)({ type: file_upload_entity_1.EntityDeleteFile }),
    (0, common_1.Delete)(':attachment_id'),
    __param(0, (0, common_1.Param)('attachment_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FileUploadController.prototype, "remove", null);
exports.FileUploadController = FileUploadController = __decorate([
    (0, swagger_1.ApiTags)('file-upload'),
    (0, common_1.Controller)('file-upload'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBadRequestResponse)({
        type: utils_1.EntityErrorResponse,
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(session_interceptor_1.SessionInterceptor),
    __metadata("design:paramtypes", [file_upload_service_1.FileUploadService])
], FileUploadController);
//# sourceMappingURL=file-upload.controller.js.map
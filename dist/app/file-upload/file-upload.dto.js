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
exports.SenderKycDto = exports.RecipientDto = exports.InvoiceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class InvoiceDto {
}
exports.InvoiceDto = InvoiceDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'binary',
        description: 'Array of KYC files to upload',
        isArray: true,
    }),
    __metadata("design:type", Array)
], InvoiceDto.prototype, "invoice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '030911af-695c-45f0-a232-07e9c0c36c0c' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InvoiceDto.prototype, "transaction_id", void 0);
class RecipientDto {
}
exports.RecipientDto = RecipientDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'binary',
        description: 'Array of KYC files to upload',
        isArray: true,
    }),
    __metadata("design:type", Array)
], RecipientDto.prototype, "kyc", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '030911af-695c-45f0-a232-07e9c0c36c0c' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RecipientDto.prototype, "recipient_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '030911af-695c-45f0-a232-07e9c0c36c0c',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RecipientDto.prototype, "transaction_id", void 0);
class SenderKycDto {
}
exports.SenderKycDto = SenderKycDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'binary',
        description: 'Array of KYC files to upload',
        isArray: true,
    }),
    __metadata("design:type", Array)
], SenderKycDto.prototype, "kyc", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '030911af-695c-45f0-a232-07e9c0c36c0c' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SenderKycDto.prototype, "kyc_id", void 0);
//# sourceMappingURL=file-upload.dto.js.map
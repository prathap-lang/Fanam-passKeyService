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
exports.UpdateTransactionDto = exports.CreateTransactionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const utils_1 = require("../../../utils");
class CreateTransactionDto {
}
exports.CreateTransactionDto = CreateTransactionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '030911af-695c-45f0-a232-07e9c0c36c0c' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "recipient_id", void 0);
class UpdateTransactionDto {
}
exports.UpdateTransactionDto = UpdateTransactionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '030911af-695c-45f0-a232-07e9c0c36c0c' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTransactionDto.prototype, "recipient_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '030911af-695c-45f0-a232-07e9c0c36c0c' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTransactionDto.prototype, "beneficiary_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '101' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateTransactionDto.prototype, "source_country_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '233' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateTransactionDto.prototype, "destination_country_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '9617.24' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], UpdateTransactionDto.prototype, "exchange_amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '148.67' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], UpdateTransactionDto.prototype, "destination_amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '030911af-695c-45f0-a232-07e9c0c36c0c' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTransactionDto.prototype, "transfer_time_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '030911af-695c-45f0-a232-07e9c0c36c0c' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTransactionDto.prototype, "visa_quote_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Tuition_fee' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(utils_1.TransactionPurpose),
    __metadata("design:type", String)
], UpdateTransactionDto.prototype, "purpose", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: `send money to my son's education fees` }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTransactionDto.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Father' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(utils_1.Relationship),
    __metadata("design:type", String)
], UpdateTransactionDto.prototype, "recipient_relationship", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateTransactionDto.prototype, "is_same_person", void 0);
//# sourceMappingURL=create-transaction.dto.js.map
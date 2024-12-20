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
exports.PayoutDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class BankDetailDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '800554' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BankDetailDto.prototype, "bankCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SORT_CODE' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BankDetailDto.prototype, "bankCodeType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'DEFAULT' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BankDetailDto.prototype, "accountNumberType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Money Market' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BankDetailDto.prototype, "accountName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'GBR' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BankDetailDto.prototype, "countryCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Barclays' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BankDetailDto.prototype, "bankName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '6970093' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BankDetailDto.prototype, "accountNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'GBP' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BankDetailDto.prototype, "currencyCode", void 0);
class AddressDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'GBR' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddressDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'London' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddressDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '675456' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddressDto.prototype, "postalCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123 Main St' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddressDto.prototype, "addressLine1", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CF' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddressDto.prototype, "state", void 0);
class RecipientDetailDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'smith' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecipientDetailDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Jessica' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecipientDetailDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: BankDetailDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => BankDetailDto),
    __metadata("design:type", BankDetailDto)
], RecipientDetailDto.prototype, "bank", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: AddressDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => AddressDto),
    __metadata("design:type", AddressDto)
], RecipientDetailDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'I' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecipientDetailDto.prototype, "type", void 0);
class SenderDetailDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: AddressDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => AddressDto),
    __metadata("design:type", AddressDto)
], SenderDetailDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ben' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SenderDetailDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'C' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SenderDetailDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'senderAccountNumber' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SenderDetailDto.prototype, "senderAccountNumber", void 0);
class TransactionDetailDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1002 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TransactionDetailDto.prototype, "initiatingPartyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'FD' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TransactionDetailDto.prototype, "businessApplicationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'advancepayment' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TransactionDetailDto.prototype, "statementNarrative", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1.5 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TransactionDetailDto.prototype, "transactionAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'GBP' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TransactionDetailDto.prototype, "transactionCurrencyCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'GBP' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TransactionDetailDto.prototype, "settlementCurrencyCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '888852397088' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TransactionDetailDto.prototype, "clientReferenceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '01' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TransactionDetailDto.prototype, "senderSourceOfFunds", void 0);
class PayoutDto {
}
exports.PayoutDto = PayoutDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: RecipientDetailDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => RecipientDetailDto),
    __metadata("design:type", RecipientDetailDto)
], PayoutDto.prototype, "recipientDetail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: SenderDetailDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => SenderDetailDto),
    __metadata("design:type", SenderDetailDto)
], PayoutDto.prototype, "senderDetail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'B' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PayoutDto.prototype, "payoutMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: TransactionDetailDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TransactionDetailDto),
    __metadata("design:type", TransactionDetailDto)
], PayoutDto.prototype, "transactionDetail", void 0);
//# sourceMappingURL=payout-payment.dto.js.map
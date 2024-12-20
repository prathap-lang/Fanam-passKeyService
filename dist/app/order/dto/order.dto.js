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
exports.webhookVisaDto = exports.webhookRazorDto = exports.UpdateCrossBorderDto = exports.CreateOrderDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateOrderDto {
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '030911af-695c-45f0-a232-07e9c0c36c0c' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "transaction_id", void 0);
class UpdateCrossBorderDto {
}
exports.UpdateCrossBorderDto = UpdateCrossBorderDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-09-03T12:34:56Z' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCrossBorderDto.prototype, "transactionDateTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'USD' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCrossBorderDto.prototype, "settlementCurrencyCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'payout123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCrossBorderDto.prototype, "payoutId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'client123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateCrossBorderDto.prototype, "clientReferenceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'standard' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCrossBorderDto.prototype, "payoutSpeed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-09-03T12:34:56Z' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateCrossBorderDto.prototype, "notificationDateTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'initiator123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateCrossBorderDto.prototype, "initiatingPartyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateCrossBorderDto.prototype, "fxConversionRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-09-03' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCrossBorderDto.prototype, "expectedPostingDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'USD' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCrossBorderDto.prototype, "destinationCurrencyCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1000.5 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateCrossBorderDto.prototype, "transactionAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'USD' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCrossBorderDto.prototype, "transactionCurrencyCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '156233o07666BUU123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCrossBorderDto.prototype, "endToEndId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'bank_transfer' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCrossBorderDto.prototype, "payoutMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1000.5 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateCrossBorderDto.prototype, "settlementAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'completed' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateCrossBorderDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1000.5 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateCrossBorderDto.prototype, "destinationAmount", void 0);
class webhookRazorDto {
}
exports.webhookRazorDto = webhookRazorDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], webhookRazorDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], webhookRazorDto.prototype, "paymentId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], webhookRazorDto.prototype, "event", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], webhookRazorDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], webhookRazorDto.prototype, "paymentMethod", void 0);
class webhookVisaDto {
}
exports.webhookVisaDto = webhookVisaDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], webhookVisaDto.prototype, "payoutId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], webhookVisaDto.prototype, "status", void 0);
//# sourceMappingURL=order.dto.js.map
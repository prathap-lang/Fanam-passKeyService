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
exports.UpdateBankDto = exports.RecipientBankAccount = exports.CreateRecipientBankAccount = exports.CreateBankAccountDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const utils_1 = require("../../../utils");
class CreateBankAccountDto {
}
exports.CreateBankAccountDto = CreateBankAccountDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'James Albert' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(utils_1.MIN_CHAR_NAME, utils_1.MAX_CHAR_NAME),
    __metadata("design:type", String)
], CreateBankAccountDto.prototype, "account_holder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SBI00980' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(utils_1.MIN_CHAR_NAME, utils_1.MAX_CHAR_NAME),
    __metadata("design:type", String)
], CreateBankAccountDto.prototype, "account_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '009-876' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBankAccountDto.prototype, "iban_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'IFUY1109' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBankAccountDto.prototype, "swift_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'yeuiuiii-0909' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBankAccountDto.prototype, "routing_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'yeuiuiii-0909' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBankAccountDto.prototype, "bsb_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'State Bank of India' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBankAccountDto.prototype, "bank_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SBI0056' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBankAccountDto.prototype, "branch_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'IBAN | Swift' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(utils_1.BankCodeType),
    __metadata("design:type", String)
], CreateBankAccountDto.prototype, "bank_code_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SBI Adyar branch,chennai' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBankAccountDto.prototype, "branch_address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Current | Savings | overdraft' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(utils_1.BankAccountType),
    __metadata("design:type", String)
], CreateBankAccountDto.prototype, "account_type", void 0);
class CreateRecipientBankAccount extends CreateBankAccountDto {
}
exports.CreateRecipientBankAccount = CreateRecipientBankAccount;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '17898aa1-48bd-4e97-ac45-aeec9e18a227' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRecipientBankAccount.prototype, "account_holer_id", void 0);
class RecipientBankAccount extends (0, swagger_1.OmitType)(CreateBankAccountDto, [
    'account_holder',
]) {
}
exports.RecipientBankAccount = RecipientBankAccount;
class UpdateBankDto extends (0, mapped_types_1.PartialType)(CreateBankAccountDto) {
}
exports.UpdateBankDto = UpdateBankDto;
//# sourceMappingURL=bank-account.dto.js.map
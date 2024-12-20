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
exports.UpdateRecipientDto = exports.CreateRecipientDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../bank-account/dto");
const class_validator_1 = require("class-validator");
const mixin_1 = require("../../../mixin");
const utils_1 = require("../../../utils");
class CreateRecipientDto extends (0, mixin_1.WithDtoAddress)((0, mixin_1.WithDtoContact)(class {
})) {
}
exports.CreateRecipientDto = CreateRecipientDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Individual |Business' }),
    (0, class_validator_1.IsEnum)(utils_1.AccountType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateRecipientDto.prototype, "recipient_account_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'James' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(utils_1.MIN_CHAR_NAME, utils_1.MAX_CHAR_NAME),
    __metadata("design:type", String)
], CreateRecipientDto.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Albert' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(utils_1.MIN_CHAR_LAST_NAME, utils_1.MAX_CHAR_NAME),
    __metadata("design:type", String)
], CreateRecipientDto.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'fanam' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(utils_1.MIN_CHAR_NAME, utils_1.MAX_CHAR_NAME),
    __metadata("design:type", String)
], CreateRecipientDto.prototype, "business_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 233 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateRecipientDto.prototype, "id_issued_country_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Passport' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(utils_1.MIN_CHAR_NAME, utils_1.MAX_CHAR_NAME),
    __metadata("design:type", String)
], CreateRecipientDto.prototype, "id_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'WEQE123123WER' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateRecipientDto.prototype, "id_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateRecipientDto.prototype, "is_send_email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: dto_1.RecipientBankAccount }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", dto_1.RecipientBankAccount)
], CreateRecipientDto.prototype, "bank_account", void 0);
class UpdateRecipientDto extends (0, mapped_types_1.PartialType)(CreateRecipientDto) {
}
exports.UpdateRecipientDto = UpdateRecipientDto;
//# sourceMappingURL=recipient.dto.js.map
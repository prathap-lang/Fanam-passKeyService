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
exports.UpdateBeneficiaryDto = exports.CreateBeneficiaryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const mixin_1 = require("../../../mixin");
const utils_1 = require("../../../utils");
class CreateBeneficiaryDto extends (0, mixin_1.WithDtoContact)(class {
}) {
}
exports.CreateBeneficiaryDto = CreateBeneficiaryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'James' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(utils_1.MIN_CHAR_NAME, utils_1.MAX_CHAR_NAME),
    __metadata("design:type", String)
], CreateBeneficiaryDto.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Albert' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(utils_1.MIN_CHAR_LAST_NAME, utils_1.MAX_CHAR_NAME),
    __metadata("design:type", String)
], CreateBeneficiaryDto.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'son' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBeneficiaryDto.prototype, "relationship", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SBI00987' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBeneficiaryDto.prototype, "account_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'rs road, adyar' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(utils_1.MIN_ADDRESS_LINE_LENGTH, utils_1.MAX_ADDRESS_LINE_LENGTH),
    __metadata("design:type", String)
], CreateBeneficiaryDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'notes' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBeneficiaryDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 233 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateBeneficiaryDto.prototype, "country_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 67 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateBeneficiaryDto.prototype, "state_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 45 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateBeneficiaryDto.prototype, "city_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '600001' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBeneficiaryDto.prototype, "zip_code", void 0);
class UpdateBeneficiaryDto extends (0, swagger_1.PartialType)(CreateBeneficiaryDto) {
}
exports.UpdateBeneficiaryDto = UpdateBeneficiaryDto;
//# sourceMappingURL=beneficiary.dto.js.map
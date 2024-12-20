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
exports.BankAccountDto = exports.WithDtoBankAccount = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const utils_1 = require("../utils");
function WithDtoBankAccount(Base) {
    class BankAccount extends Base {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'SBI00987' }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.Length)(utils_1.MIN_CHAR_NAME, utils_1.MAX_CHAR_NAME),
        __metadata("design:type", String)
    ], BankAccount.prototype, "account_no", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ example: '009-876' }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], BankAccount.prototype, "iban_no", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'IFUY1109' }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        __metadata("design:type", String)
    ], BankAccount.prototype, "swift_code", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'yeuiuiii-0909' }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], BankAccount.prototype, "routing_code", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'State Bank of India' }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        __metadata("design:type", String)
    ], BankAccount.prototype, "bank_name", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'SBI0056' }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        __metadata("design:type", String)
    ], BankAccount.prototype, "branch_code", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'SBI Adyar branch,chennai' }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        __metadata("design:type", String)
    ], BankAccount.prototype, "branch_address", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'Individual | Business' }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsEnum)(utils_1.BankAccountType),
        __metadata("design:type", String)
    ], BankAccount.prototype, "account_type", void 0);
    return BankAccount;
}
exports.WithDtoBankAccount = WithDtoBankAccount;
class BankAccountDto extends WithDtoBankAccount(class {
}) {
}
exports.BankAccountDto = BankAccountDto;
//# sourceMappingURL=bank-account.mixin.js.map
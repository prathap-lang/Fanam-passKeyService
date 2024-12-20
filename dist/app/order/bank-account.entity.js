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
exports.EntityDeleteBankAccount = exports.EntityUpdateBankAccount = exports.EntityCreateBankAccount = exports.EntityGetBankAccount = exports.EntityGetBankAccountList = exports.DeleteResBankAccount = exports.GetAllResBankAccount = exports.BaseResBankAccount = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const mixin_1 = require("../../mixin");
const utils_1 = require("../../utils");
class BaseResBankAccount extends (0, mixin_1.WithEntityContact)(class {
}) {
}
exports.BaseResBankAccount = BaseResBankAccount;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '17898aa1-48bd-4e97-ac45-aeec9e18a227' }),
    __metadata("design:type", String)
], BaseResBankAccount.prototype, "bank_account_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'James Albert' }),
    __metadata("design:type", String)
], BaseResBankAccount.prototype, "account_holder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'James Albert' }),
    __metadata("design:type", String)
], BaseResBankAccount.prototype, "account_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '009-876' }),
    __metadata("design:type", String)
], BaseResBankAccount.prototype, "iban_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'IFUY1109' }),
    __metadata("design:type", String)
], BaseResBankAccount.prototype, "swift_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'yeuiuiii-0909' }),
    __metadata("design:type", String)
], BaseResBankAccount.prototype, "routing_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'State Bank of India' }),
    __metadata("design:type", String)
], BaseResBankAccount.prototype, "bank_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SBI0056' }),
    __metadata("design:type", String)
], BaseResBankAccount.prototype, "branch_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SBI Adyar branch,chennai' }),
    __metadata("design:type", String)
], BaseResBankAccount.prototype, "branch_address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Individual | Business' }),
    __metadata("design:type", String)
], BaseResBankAccount.prototype, "account_type", void 0);
class GetAllResBankAccount extends (0, swagger_1.PickType)(BaseResBankAccount, [
    'bank_account_id',
    'account_holder',
    'account_no',
]) {
}
exports.GetAllResBankAccount = GetAllResBankAccount;
class DeleteResBankAccount extends (0, swagger_1.PickType)(BaseResBankAccount, [
    'bank_account_id',
]) {
}
exports.DeleteResBankAccount = DeleteResBankAccount;
class EntityGetBankAccountList extends utils_1.BaseResponse {
}
exports.EntityGetBankAccountList = EntityGetBankAccountList;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: GetAllResBankAccount,
        isArray: true,
    }),
    __metadata("design:type", Array)
], EntityGetBankAccountList.prototype, "result", void 0);
class EntityGetBankAccount extends utils_1.BaseResponse {
}
exports.EntityGetBankAccount = EntityGetBankAccount;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: BaseResBankAccount,
    }),
    __metadata("design:type", BaseResBankAccount)
], EntityGetBankAccount.prototype, "result", void 0);
class EntityCreateBankAccount extends utils_1.BaseResponse {
}
exports.EntityCreateBankAccount = EntityCreateBankAccount;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: BaseResBankAccount,
    }),
    __metadata("design:type", BaseResBankAccount)
], EntityCreateBankAccount.prototype, "result", void 0);
class EntityUpdateBankAccount extends utils_1.BaseResponse {
}
exports.EntityUpdateBankAccount = EntityUpdateBankAccount;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: BaseResBankAccount,
    }),
    __metadata("design:type", BaseResBankAccount)
], EntityUpdateBankAccount.prototype, "result", void 0);
class EntityDeleteBankAccount extends utils_1.BaseResponse {
}
exports.EntityDeleteBankAccount = EntityDeleteBankAccount;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: DeleteResBankAccount,
    }),
    __metadata("design:type", DeleteResBankAccount)
], EntityDeleteBankAccount.prototype, "result", void 0);
//# sourceMappingURL=bank-account.entity.js.map
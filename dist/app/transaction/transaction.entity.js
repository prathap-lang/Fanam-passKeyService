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
exports.EntityDeleteTransaction = exports.EntityUpdateTransaction = exports.EntityCreateTransaction = exports.EntityGetTransaction = exports.EntityGetTransactionList = exports.DeleteResTransaction = exports.GetAllResTransaction = exports.BaseResTransaction = void 0;
const swagger_1 = require("@nestjs/swagger");
const bank_account_entity_1 = require("../bank-account/bank-account.entity");
const file_upload_entity_1 = require("../file-upload/file-upload.entity");
const entity_1 = require("../location/entity");
const order_entity_1 = require("../order/order.entity");
const recipient_entity_1 = require("../recipient/recipient.entity");
const user_entity_1 = require("../user/user.entity");
const class_transformer_1 = require("class-transformer");
const utils_1 = require("../../utils");
class BaseResTransaction {
}
exports.BaseResTransaction = BaseResTransaction;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '17898aa1-48bd-4e97-ac45-aeec9e18a227' }),
    __metadata("design:type", String)
], BaseResTransaction.prototype, "transaction_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Individual' }),
    __metadata("design:type", String)
], BaseResTransaction.prototype, "sender_account_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Business' }),
    __metadata("design:type", String)
], BaseResTransaction.prototype, "recipient_account_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: entity_1.BaseResCountry }),
    __metadata("design:type", entity_1.BaseResCountry)
], BaseResTransaction.prototype, "source_country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: entity_1.BaseResCountry }),
    __metadata("design:type", entity_1.BaseResCountry)
], BaseResTransaction.prototype, "destination_country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10000 }),
    __metadata("design:type", Number)
], BaseResTransaction.prototype, "source_amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 146.67 }),
    __metadata("design:type", Number)
], BaseResTransaction.prototype, "destination_amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1.67 }),
    __metadata("design:type", Number)
], BaseResTransaction.prototype, "markup_fee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Tuition_fee' }),
    __metadata("design:type", String)
], BaseResTransaction.prototype, "purpose", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: `money send to my son's education fees` }),
    __metadata("design:type", String)
], BaseResTransaction.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Transaction_initiated' }),
    __metadata("design:type", String)
], BaseResTransaction.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: recipient_entity_1.BaseResRecipient }),
    __metadata("design:type", recipient_entity_1.BaseResRecipient)
], BaseResTransaction.prototype, "recipient", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: bank_account_entity_1.BaseResBankAccount }),
    __metadata("design:type", bank_account_entity_1.BaseResBankAccount)
], BaseResTransaction.prototype, "beneficiary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: order_entity_1.BaseResOrder }),
    __metadata("design:type", order_entity_1.BaseResOrder)
], BaseResTransaction.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: user_entity_1.BaseResUser }),
    __metadata("design:type", user_entity_1.BaseResUser)
], BaseResTransaction.prototype, "created_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [file_upload_entity_1.EntityAttachment] }),
    __metadata("design:type", Array)
], BaseResTransaction.prototype, "invoice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: file_upload_entity_1.EntityAttachment }),
    __metadata("design:type", file_upload_entity_1.EntityAttachment)
], BaseResTransaction.prototype, "reconciliation_report", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], BaseResTransaction.prototype, "beneficiary_id", void 0);
class GetAllResTransaction extends (0, swagger_1.PickType)(BaseResTransaction, [
    'transaction_id',
    'source_country',
    'destination_country',
    'source_amount',
    'destination_amount',
    'markup_fee',
    'purpose',
    'reason',
    'status',
]) {
}
exports.GetAllResTransaction = GetAllResTransaction;
class DeleteResTransaction extends (0, swagger_1.PickType)(BaseResTransaction, [
    'transaction_id',
]) {
}
exports.DeleteResTransaction = DeleteResTransaction;
class EntityGetTransactionList extends utils_1.BaseResponse {
}
exports.EntityGetTransactionList = EntityGetTransactionList;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: GetAllResTransaction,
        isArray: true,
    }),
    __metadata("design:type", Array)
], EntityGetTransactionList.prototype, "result", void 0);
class EntityGetTransaction extends utils_1.BaseResponse {
}
exports.EntityGetTransaction = EntityGetTransaction;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: BaseResTransaction,
    }),
    __metadata("design:type", BaseResTransaction)
], EntityGetTransaction.prototype, "result", void 0);
class EntityCreateTransaction extends utils_1.BaseResponse {
}
exports.EntityCreateTransaction = EntityCreateTransaction;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: BaseResTransaction,
    }),
    __metadata("design:type", BaseResTransaction)
], EntityCreateTransaction.prototype, "result", void 0);
class EntityUpdateTransaction extends utils_1.BaseResponse {
}
exports.EntityUpdateTransaction = EntityUpdateTransaction;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: BaseResTransaction,
    }),
    __metadata("design:type", BaseResTransaction)
], EntityUpdateTransaction.prototype, "result", void 0);
class EntityDeleteTransaction extends utils_1.BaseResponse {
}
exports.EntityDeleteTransaction = EntityDeleteTransaction;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: DeleteResTransaction,
    }),
    __metadata("design:type", DeleteResTransaction)
], EntityDeleteTransaction.prototype, "result", void 0);
//# sourceMappingURL=transaction.entity.js.map
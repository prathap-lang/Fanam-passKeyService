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
exports.EntityDeleteRecipient = exports.EntityUpdateRecipient = exports.EntityCreateRecipient = exports.EntityGetRecipient = exports.EntityGetRecipientList = exports.DeleteResRecipient = exports.GetAllResRecipient = exports.BaseResRecipient = void 0;
const swagger_1 = require("@nestjs/swagger");
const bank_account_entity_1 = require("../bank-account/bank-account.entity");
const mixin_1 = require("../../mixin");
const utils_1 = require("../../utils");
class BaseResRecipient extends (0, mixin_1.WithEntityAddress)((0, mixin_1.WithEntityContact)(class {
})) {
}
exports.BaseResRecipient = BaseResRecipient;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '17898aa1-48bd-4e97-ac45-aeec9e18a227' }),
    __metadata("design:type", String)
], BaseResRecipient.prototype, "recipient_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Business' }),
    __metadata("design:type", String)
], BaseResRecipient.prototype, "recipient_account_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'James' }),
    __metadata("design:type", String)
], BaseResRecipient.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Albert' }),
    __metadata("design:type", String)
], BaseResRecipient.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'James' }),
    __metadata("design:type", String)
], BaseResRecipient.prototype, "business_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'James' }),
    __metadata("design:type", String)
], BaseResRecipient.prototype, "relationship", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'James' }),
    __metadata("design:type", Boolean)
], BaseResRecipient.prototype, "is_same_person", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: bank_account_entity_1.BaseResBankAccount }),
    __metadata("design:type", bank_account_entity_1.BaseResBankAccount)
], BaseResRecipient.prototype, "bank_account", void 0);
class GetAllResRecipient extends (0, swagger_1.PickType)(BaseResRecipient, [
    'recipient_id',
    'first_name',
    'last_name',
]) {
}
exports.GetAllResRecipient = GetAllResRecipient;
class DeleteResRecipient extends (0, swagger_1.PickType)(BaseResRecipient, [
    'recipient_id',
]) {
}
exports.DeleteResRecipient = DeleteResRecipient;
class EntityGetRecipientList extends utils_1.BaseResponse {
}
exports.EntityGetRecipientList = EntityGetRecipientList;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: GetAllResRecipient,
        isArray: true,
    }),
    __metadata("design:type", Array)
], EntityGetRecipientList.prototype, "result", void 0);
class EntityGetRecipient extends utils_1.BaseResponse {
}
exports.EntityGetRecipient = EntityGetRecipient;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: BaseResRecipient,
    }),
    __metadata("design:type", BaseResRecipient)
], EntityGetRecipient.prototype, "result", void 0);
class EntityCreateRecipient extends utils_1.BaseResponse {
}
exports.EntityCreateRecipient = EntityCreateRecipient;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: BaseResRecipient,
    }),
    __metadata("design:type", BaseResRecipient)
], EntityCreateRecipient.prototype, "result", void 0);
class EntityUpdateRecipient extends utils_1.BaseResponse {
}
exports.EntityUpdateRecipient = EntityUpdateRecipient;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: BaseResRecipient,
    }),
    __metadata("design:type", BaseResRecipient)
], EntityUpdateRecipient.prototype, "result", void 0);
class EntityDeleteRecipient extends utils_1.BaseResponse {
}
exports.EntityDeleteRecipient = EntityDeleteRecipient;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: DeleteResRecipient,
    }),
    __metadata("design:type", DeleteResRecipient)
], EntityDeleteRecipient.prototype, "result", void 0);
//# sourceMappingURL=recipient.entity.js.map
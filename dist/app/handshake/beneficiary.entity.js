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
exports.EntityDeleteBeneficiary = exports.EntityUpdateBeneficiary = exports.EntityCreateBeneficiary = exports.EntityGetBeneficiary = exports.EntityGetBeneficiaryList = exports.DeleteResBeneficiary = exports.GetAllResBeneficiary = exports.BaseResBeneficiary = void 0;
const swagger_1 = require("@nestjs/swagger");
const mixin_1 = require("../../mixin");
const utils_1 = require("../../utils");
class BaseResBeneficiary extends (0, mixin_1.WithEntityAddress)((0, mixin_1.WithEntityContact)(class {
})) {
}
exports.BaseResBeneficiary = BaseResBeneficiary;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '17898aa1-48bd-4e97-ac45-aeec9e18a227' }),
    __metadata("design:type", String)
], BaseResBeneficiary.prototype, "beneficiary_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'James ' }),
    __metadata("design:type", String)
], BaseResBeneficiary.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Albert' }),
    __metadata("design:type", String)
], BaseResBeneficiary.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'son' }),
    __metadata("design:type", String)
], BaseResBeneficiary.prototype, "relationship", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'notes' }),
    __metadata("design:type", String)
], BaseResBeneficiary.prototype, "notes", void 0);
class GetAllResBeneficiary extends (0, swagger_1.PickType)(BaseResBeneficiary, [
    'first_name',
    'last_name',
    'beneficiary_id',
]) {
}
exports.GetAllResBeneficiary = GetAllResBeneficiary;
class DeleteResBeneficiary extends (0, swagger_1.PickType)(BaseResBeneficiary, [
    'beneficiary_id',
]) {
}
exports.DeleteResBeneficiary = DeleteResBeneficiary;
class EntityGetBeneficiaryList extends utils_1.BaseResponse {
}
exports.EntityGetBeneficiaryList = EntityGetBeneficiaryList;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: GetAllResBeneficiary,
        isArray: true,
    }),
    __metadata("design:type", Array)
], EntityGetBeneficiaryList.prototype, "result", void 0);
class EntityGetBeneficiary extends utils_1.BaseResponse {
}
exports.EntityGetBeneficiary = EntityGetBeneficiary;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: BaseResBeneficiary,
    }),
    __metadata("design:type", BaseResBeneficiary)
], EntityGetBeneficiary.prototype, "result", void 0);
class EntityCreateBeneficiary extends utils_1.BaseResponse {
}
exports.EntityCreateBeneficiary = EntityCreateBeneficiary;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: BaseResBeneficiary,
    }),
    __metadata("design:type", BaseResBeneficiary)
], EntityCreateBeneficiary.prototype, "result", void 0);
class EntityUpdateBeneficiary extends utils_1.BaseResponse {
}
exports.EntityUpdateBeneficiary = EntityUpdateBeneficiary;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: BaseResBeneficiary,
    }),
    __metadata("design:type", BaseResBeneficiary)
], EntityUpdateBeneficiary.prototype, "result", void 0);
class EntityDeleteBeneficiary extends utils_1.BaseResponse {
}
exports.EntityDeleteBeneficiary = EntityDeleteBeneficiary;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: DeleteResBeneficiary,
    }),
    __metadata("design:type", DeleteResBeneficiary)
], EntityDeleteBeneficiary.prototype, "result", void 0);
//# sourceMappingURL=beneficiary.entity.js.map
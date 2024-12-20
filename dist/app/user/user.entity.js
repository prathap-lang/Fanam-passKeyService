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
exports.EntityDeleteUser = exports.EntityUpdateUser = exports.EntityCreateUser = exports.EntityGetUser = exports.DeleteResUser = exports.BaseResUser = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const utils_1 = require("../../utils");
class BaseResUser {
}
exports.BaseResUser = BaseResUser;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '17898aa1-48bd-4e97-ac45-aeec9e18a227' }),
    __metadata("design:type", String)
], BaseResUser.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'James Albert' }),
    __metadata("design:type", String)
], BaseResUser.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'James Albert' }),
    __metadata("design:type", String)
], BaseResUser.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Active' }),
    __metadata("design:type", String)
], BaseResUser.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], BaseResUser.prototype, "pin", void 0);
class DeleteResUser extends (0, swagger_1.PickType)(BaseResUser, [
    'user_id',
]) {
}
exports.DeleteResUser = DeleteResUser;
class EntityGetUser extends utils_1.BaseResponse {
}
exports.EntityGetUser = EntityGetUser;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: BaseResUser,
    }),
    __metadata("design:type", BaseResUser)
], EntityGetUser.prototype, "result", void 0);
class EntityCreateUser extends utils_1.BaseResponse {
}
exports.EntityCreateUser = EntityCreateUser;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: BaseResUser,
    }),
    __metadata("design:type", BaseResUser)
], EntityCreateUser.prototype, "result", void 0);
class EntityUpdateUser extends utils_1.BaseResponse {
}
exports.EntityUpdateUser = EntityUpdateUser;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: BaseResUser,
    }),
    __metadata("design:type", BaseResUser)
], EntityUpdateUser.prototype, "result", void 0);
class EntityDeleteUser extends utils_1.BaseResponse {
}
exports.EntityDeleteUser = EntityDeleteUser;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: DeleteResUser,
    }),
    __metadata("design:type", DeleteResUser)
], EntityDeleteUser.prototype, "result", void 0);
//# sourceMappingURL=user.entity.js.map
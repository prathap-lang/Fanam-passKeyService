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
exports.EntityErrorResponse = exports.AppResponse = exports.BaseResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
class BaseResponse {
}
exports.BaseResponse = BaseResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 200 }),
    __metadata("design:type", Number)
], BaseResponse.prototype, "status_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Success' }),
    __metadata("design:type", String)
], BaseResponse.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Request Processed Successfully' }),
    __metadata("design:type", String)
], BaseResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], BaseResponse.prototype, "is_encrypted", void 0);
class AppResponse {
    constructor(result, message = 'Request is processed successfully', status = 'Success', statusCode = 200, isEncrypted = false) {
        this.status_code = statusCode;
        this.status = status;
        this.message = message;
        this.is_encrypted = isEncrypted;
        this.result = result;
    }
}
exports.AppResponse = AppResponse;
class EntityErrorResponse {
}
exports.EntityErrorResponse = EntityErrorResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 400 }),
    __metadata("design:type", Number)
], EntityErrorResponse.prototype, "status_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Error' }),
    __metadata("design:type", String)
], EntityErrorResponse.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Something went wrong' }),
    __metadata("design:type", String)
], EntityErrorResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], EntityErrorResponse.prototype, "is_encrypted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: null }),
    __metadata("design:type", Object)
], EntityErrorResponse.prototype, "result", void 0);
//# sourceMappingURL=base.entity.js.map
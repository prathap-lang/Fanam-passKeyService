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
exports.CreateEncryptPayload = exports.EncryptPayload = exports.CancelPayment = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CancelPayment {
}
exports.CancelPayment = CancelPayment;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '714614f8-6d4c-4a05-bc80-363a97de85fe' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CancelPayment.prototype, "transaction_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'test' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CancelPayment.prototype, "cancel_reason", void 0);
class EncryptPayload {
}
exports.EncryptPayload = EncryptPayload;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '4a05-bc80-363a97de85fe',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EncryptPayload.prototype, "proposalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'SUCCESS',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EncryptPayload.prototype, "transactionStatus", void 0);
class CreateEncryptPayload {
}
exports.CreateEncryptPayload = CreateEncryptPayload;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: EncryptPayload,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", EncryptPayload)
], CreateEncryptPayload.prototype, "payment", void 0);
//# sourceMappingURL=cancel-payment.dto.js.map
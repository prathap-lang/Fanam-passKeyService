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
exports.EntityFetchOrder = exports.EntityCreateOrder = exports.BaseResOrder = void 0;
const swagger_1 = require("@nestjs/swagger");
const transaction_entity_1 = require("../transaction/transaction.entity");
const utils_1 = require("../../utils");
const common_enum_1 = require("../../utils/common.enum");
class BaseResOrder {
}
exports.BaseResOrder = BaseResOrder;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '6ac866e0-6281-4142-9e75-6c7cd0c647fc' }),
    __metadata("design:type", String)
], BaseResOrder.prototype, "order_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'fan20240902002' }),
    __metadata("design:type", String)
], BaseResOrder.prototype, "order_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 101 }),
    __metadata("design:type", Number)
], BaseResOrder.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'order_OsIt5DTFbP6ktF' }),
    __metadata("design:type", String)
], BaseResOrder.prototype, "razorpay_order_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Payment_initiated' }),
    __metadata("design:type", String)
], BaseResOrder.prototype, "order_status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Pending' }),
    __metadata("design:type", String)
], BaseResOrder.prototype, "payment_status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ed6ae947-d8e6-4e6c-ab22-1343e4d1e97f' }),
    __metadata("design:type", String)
], BaseResOrder.prototype, "transaction_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: null }),
    __metadata("design:type", String)
], BaseResOrder.prototype, "payment_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'b61e245b-d94f-445f-b50e-079e5b94b454' }),
    __metadata("design:type", String)
], BaseResOrder.prototype, "user_id", void 0);
class EntityCreateOrder extends utils_1.BaseResponse {
}
exports.EntityCreateOrder = EntityCreateOrder;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: BaseResOrder,
    }),
    __metadata("design:type", BaseResOrder)
], EntityCreateOrder.prototype, "result", void 0);
class BaseResponseOrder {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'c09b8ed4-33ab-4679-90a3-545af7dd9d39' }),
    __metadata("design:type", String)
], BaseResponseOrder.prototype, "order_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '' }),
    __metadata("design:type", String)
], BaseResponseOrder.prototype, "order_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100 }),
    __metadata("design:type", Number)
], BaseResponseOrder.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: null }),
    __metadata("design:type", String)
], BaseResponseOrder.prototype, "razorpay_order_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Payment_initiated' }),
    __metadata("design:type", String)
], BaseResponseOrder.prototype, "order_status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: null }),
    __metadata("design:type", String)
], BaseResponseOrder.prototype, "payment_status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '159ce975-8508-48d3-8cea-2280e8932ae3' }),
    __metadata("design:type", String)
], BaseResponseOrder.prototype, "transaction_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: null }),
    __metadata("design:type", String)
], BaseResponseOrder.prototype, "payment_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'd7bcca73-8cce-4ea1-97eb-d69092ab3add' }),
    __metadata("design:type", String)
], BaseResponseOrder.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], BaseResponseOrder.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-09-12T11:29:30.205Z' }),
    __metadata("design:type", Date)
], BaseResponseOrder.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-09-12T11:40:22.610Z' }),
    __metadata("design:type", Date)
], BaseResponseOrder.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: transaction_entity_1.BaseResTransaction }),
    __metadata("design:type", transaction_entity_1.BaseResTransaction)
], BaseResponseOrder.prototype, "transaction", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: null }),
    __metadata("design:type", String)
], BaseResponseOrder.prototype, "payment", void 0);
class EntityFetchOrder extends utils_1.BaseResponse {
}
exports.EntityFetchOrder = EntityFetchOrder;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: BaseResponseOrder,
    }),
    __metadata("design:type", BaseResponseOrder)
], EntityFetchOrder.prototype, "result", void 0);
//# sourceMappingURL=order.entity.js.map
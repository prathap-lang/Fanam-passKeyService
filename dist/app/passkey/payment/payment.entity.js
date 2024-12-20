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
exports.GetResPopularCorridors = exports.GetResFxRate = exports.BaseResPopularCorridor = exports.BaseResFxRate = exports.Payment = void 0;
const swagger_1 = require("@nestjs/swagger");
const entity_1 = require("../../location/entity");
const utils_1 = require("../../../utils");
class Payment {
}
exports.Payment = Payment;
class BaseResFxRate {
}
exports.BaseResFxRate = BaseResFxRate;
__decorate([
    (0, swagger_1.ApiProperty)({ type: entity_1.BaseResCountry }),
    __metadata("design:type", entity_1.BaseResCountry)
], BaseResFxRate.prototype, "source_country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: entity_1.BaseResCountry }),
    __metadata("design:type", entity_1.BaseResCountry)
], BaseResFxRate.prototype, "destination_country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100 }),
    __metadata("design:type", String)
], BaseResFxRate.prototype, "source_amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '74.44' }),
    __metadata("design:type", String)
], BaseResFxRate.prototype, "destination_amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 83.04 }),
    __metadata("design:type", Number)
], BaseResFxRate.prototype, "conversion_rate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 323 }),
    __metadata("design:type", Number)
], BaseResFxRate.prototype, "markup_fee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1161145905 }),
    __metadata("design:type", Number)
], BaseResFxRate.prototype, "quoteId", void 0);
class BaseResPopularCorridor {
}
exports.BaseResPopularCorridor = BaseResPopularCorridor;
__decorate([
    (0, swagger_1.ApiProperty)({ type: entity_1.BaseResCountry }),
    __metadata("design:type", entity_1.BaseResCountry)
], BaseResPopularCorridor.prototype, "source_country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: entity_1.BaseResCountry }),
    __metadata("design:type", entity_1.BaseResCountry)
], BaseResPopularCorridor.prototype, "destination_country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: entity_1.BaseResCountry }),
    __metadata("design:type", Number)
], BaseResPopularCorridor.prototype, "conversion_rate", void 0);
class GetResFxRate extends utils_1.BaseResponse {
}
exports.GetResFxRate = GetResFxRate;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: BaseResFxRate,
    }),
    __metadata("design:type", BaseResFxRate)
], GetResFxRate.prototype, "result", void 0);
class GetResPopularCorridors extends utils_1.BaseResponse {
}
exports.GetResPopularCorridors = GetResPopularCorridors;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: BaseResPopularCorridor,
        isArray: true,
    }),
    __metadata("design:type", Array)
], GetResPopularCorridors.prototype, "result", void 0);
//# sourceMappingURL=payment.entity.js.map
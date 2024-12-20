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
exports.EntityGetSubregionDetail = exports.EntityGetSubregions = exports.GetResSubregionDetail = exports.GetResSubregions = exports.BaseResSubregion = void 0;
const swagger_1 = require("@nestjs/swagger");
const utils_1 = require("../../../utils");
const entity_1 = require("../entity");
class BaseResSubregion {
}
exports.BaseResSubregion = BaseResSubregion;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 14 }),
    __metadata("design:type", Number)
], BaseResSubregion.prototype, "subregion_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Southern Asia' }),
    __metadata("design:type", String)
], BaseResSubregion.prototype, "subregion_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3 }),
    __metadata("design:type", Number)
], BaseResSubregion.prototype, "region_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => entity_1.BaseResRegion }),
    __metadata("design:type", entity_1.BaseResRegion)
], BaseResSubregion.prototype, "region", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => entity_1.BaseResCountry, isArray: true }),
    __metadata("design:type", Array)
], BaseResSubregion.prototype, "countries", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => entity_1.BaseResState, isArray: true }),
    __metadata("design:type", Array)
], BaseResSubregion.prototype, "states", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => entity_1.BaseResCity, isArray: true }),
    __metadata("design:type", Array)
], BaseResSubregion.prototype, "cities", void 0);
class GetResSubregions extends (0, swagger_1.PickType)(BaseResSubregion, [
    'subregion_id',
    'subregion_name',
]) {
}
exports.GetResSubregions = GetResSubregions;
class GetResSubregionDetail extends (0, swagger_1.OmitType)(BaseResSubregion, [
    'region_id',
]) {
}
exports.GetResSubregionDetail = GetResSubregionDetail;
class EntityGetSubregions extends utils_1.BaseResponse {
}
exports.EntityGetSubregions = EntityGetSubregions;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => GetResSubregions, isArray: true }),
    __metadata("design:type", Array)
], EntityGetSubregions.prototype, "result", void 0);
class EntityGetSubregionDetail extends utils_1.BaseResponse {
}
exports.EntityGetSubregionDetail = EntityGetSubregionDetail;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => GetResSubregionDetail }),
    __metadata("design:type", GetResSubregionDetail)
], EntityGetSubregionDetail.prototype, "result", void 0);
//# sourceMappingURL=subregion.entity.js.map
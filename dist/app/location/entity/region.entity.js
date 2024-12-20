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
exports.EntityGetRegionDetail = exports.EntityGetRegions = exports.GetResRegions = exports.BaseResRegion = void 0;
const swagger_1 = require("@nestjs/swagger");
const utils_1 = require("../../../utils");
const entity_1 = require("../entity");
class BaseResRegion {
}
exports.BaseResRegion = BaseResRegion;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3 }),
    __metadata("design:type", Number)
], BaseResRegion.prototype, "region_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Asia' }),
    __metadata("design:type", String)
], BaseResRegion.prototype, "region_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => entity_1.BaseResSubregion, isArray: true }),
    __metadata("design:type", Array)
], BaseResRegion.prototype, "subregions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => entity_1.BaseResCountry, isArray: true }),
    __metadata("design:type", Array)
], BaseResRegion.prototype, "countries", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => entity_1.BaseResState, isArray: true }),
    __metadata("design:type", Array)
], BaseResRegion.prototype, "states", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => entity_1.BaseResCity, isArray: true }),
    __metadata("design:type", Array)
], BaseResRegion.prototype, "cities", void 0);
class GetResRegions extends (0, swagger_1.PickType)(BaseResRegion, [
    'region_id',
    'region_name',
]) {
}
exports.GetResRegions = GetResRegions;
class EntityGetRegions extends utils_1.BaseResponse {
}
exports.EntityGetRegions = EntityGetRegions;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => GetResRegions, isArray: true }),
    __metadata("design:type", Array)
], EntityGetRegions.prototype, "result", void 0);
class EntityGetRegionDetail extends utils_1.BaseResponse {
}
exports.EntityGetRegionDetail = EntityGetRegionDetail;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => BaseResRegion }),
    __metadata("design:type", BaseResRegion)
], EntityGetRegionDetail.prototype, "result", void 0);
//# sourceMappingURL=region.entity.js.map
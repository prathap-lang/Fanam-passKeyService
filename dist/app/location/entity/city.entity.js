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
exports.EntityGetCityDetail = exports.EntityGetCities = exports.GetResCityDetail = exports.GetResCities = exports.BaseResCity = void 0;
const swagger_1 = require("@nestjs/swagger");
const utils_1 = require("../../../utils");
const entity_1 = require("../entity");
class BaseResCity {
}
exports.BaseResCity = BaseResCity;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 134108 }),
    __metadata("design:type", Number)
], BaseResCity.prototype, "city_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Tambaram' }),
    __metadata("design:type", String)
], BaseResCity.prototype, "city_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12.92460000' }),
    __metadata("design:type", String)
], BaseResCity.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '80.12707000' }),
    __metadata("design:type", String)
], BaseResCity.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3 }),
    __metadata("design:type", String)
], BaseResCity.prototype, "region_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => entity_1.BaseResRegion }),
    __metadata("design:type", entity_1.BaseResRegion)
], BaseResCity.prototype, "region", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 14 }),
    __metadata("design:type", String)
], BaseResCity.prototype, "subregion_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => entity_1.BaseResSubregion }),
    __metadata("design:type", entity_1.BaseResSubregion)
], BaseResCity.prototype, "subregion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 101 }),
    __metadata("design:type", String)
], BaseResCity.prototype, "country_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => entity_1.BaseResCountry }),
    __metadata("design:type", entity_1.BaseResCountry)
], BaseResCity.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4035 }),
    __metadata("design:type", String)
], BaseResCity.prototype, "state_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => entity_1.BaseResState }),
    __metadata("design:type", entity_1.BaseResState)
], BaseResCity.prototype, "state", void 0);
class GetResCities extends (0, swagger_1.PickType)(BaseResCity, [
    'city_id',
    'city_name',
]) {
}
exports.GetResCities = GetResCities;
class GetResCityDetail extends (0, swagger_1.OmitType)(BaseResCity, [
    'region_id',
    'subregion_id',
    'country_id',
    'state_id',
]) {
}
exports.GetResCityDetail = GetResCityDetail;
class EntityGetCities extends utils_1.BaseResponse {
}
exports.EntityGetCities = EntityGetCities;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => GetResCities, isArray: true }),
    __metadata("design:type", Array)
], EntityGetCities.prototype, "result", void 0);
class EntityGetCityDetail extends utils_1.BaseResponse {
}
exports.EntityGetCityDetail = EntityGetCityDetail;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => GetResCityDetail }),
    __metadata("design:type", GetResCityDetail)
], EntityGetCityDetail.prototype, "result", void 0);
//# sourceMappingURL=city.entity.js.map
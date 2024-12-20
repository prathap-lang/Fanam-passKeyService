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
exports.EntityGetCountryDetail = exports.EntityGetCountries = exports.GetResCountryDetail = exports.GetResCountries = exports.BaseResCountry = void 0;
const swagger_1 = require("@nestjs/swagger");
const utils_1 = require("../../../utils");
const entity_1 = require("../entity");
class BaseResCountry {
}
exports.BaseResCountry = BaseResCountry;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 101 }),
    __metadata("design:type", Number)
], BaseResCountry.prototype, "country_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'India' }),
    __metadata("design:type", String)
], BaseResCountry.prototype, "country_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'IND' }),
    __metadata("design:type", String)
], BaseResCountry.prototype, "iso3", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'IN' }),
    __metadata("design:type", String)
], BaseResCountry.prototype, "iso2", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '🇮🇳' }),
    __metadata("design:type", String)
], BaseResCountry.prototype, "emoji", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'U+1F1EE U+1F1F3' }),
    __metadata("design:type", String)
], BaseResCountry.prototype, "emojiU", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '356' }),
    __metadata("design:type", String)
], BaseResCountry.prototype, "numeric_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '91' }),
    __metadata("design:type", String)
], BaseResCountry.prototype, "phone_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'New Delhi' }),
    __metadata("design:type", String)
], BaseResCountry.prototype, "capital", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'INR' }),
    __metadata("design:type", String)
], BaseResCountry.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Indian rupee' }),
    __metadata("design:type", String)
], BaseResCountry.prototype, "currency_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '₹' }),
    __metadata("design:type", String)
], BaseResCountry.prototype, "currency_symbol", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '.in' }),
    __metadata("design:type", String)
], BaseResCountry.prototype, "tld", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'भारत' }),
    __metadata("design:type", String)
], BaseResCountry.prototype, "native", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Indian' }),
    __metadata("design:type", String)
], BaseResCountry.prototype, "nationality", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '20.00000000' }),
    __metadata("design:type", String)
], BaseResCountry.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '77.00000000' }),
    __metadata("design:type", String)
], BaseResCountry.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3 }),
    __metadata("design:type", String)
], BaseResCountry.prototype, "region_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => entity_1.BaseResRegion }),
    __metadata("design:type", entity_1.BaseResRegion)
], BaseResCountry.prototype, "region", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 14 }),
    __metadata("design:type", String)
], BaseResCountry.prototype, "subregion_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => entity_1.BaseResSubregion }),
    __metadata("design:type", entity_1.BaseResSubregion)
], BaseResCountry.prototype, "subregion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => entity_1.BaseResState, isArray: true }),
    __metadata("design:type", Array)
], BaseResCountry.prototype, "states", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => entity_1.BaseResCity, isArray: true }),
    __metadata("design:type", Array)
], BaseResCountry.prototype, "cities", void 0);
class GetResCountries extends (0, swagger_1.PickType)(BaseResCountry, [
    'country_id',
    'country_name',
]) {
}
exports.GetResCountries = GetResCountries;
class GetResCountryDetail extends (0, swagger_1.OmitType)(BaseResCountry, [
    'region_id',
    'subregion_id',
]) {
}
exports.GetResCountryDetail = GetResCountryDetail;
class EntityGetCountries extends utils_1.BaseResponse {
}
exports.EntityGetCountries = EntityGetCountries;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => GetResCountries, isArray: true }),
    __metadata("design:type", Array)
], EntityGetCountries.prototype, "result", void 0);
class EntityGetCountryDetail extends utils_1.BaseResponse {
}
exports.EntityGetCountryDetail = EntityGetCountryDetail;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => GetResCountryDetail }),
    __metadata("design:type", GetResCountryDetail)
], EntityGetCountryDetail.prototype, "result", void 0);
//# sourceMappingURL=country.entity.js.map
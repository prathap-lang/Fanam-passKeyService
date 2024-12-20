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
exports.EntityGetStateDetail = exports.EntityGetStates = exports.GetResStateDetail = exports.GetResStates = exports.BaseResState = void 0;
const swagger_1 = require("@nestjs/swagger");
const utils_1 = require("../../../utils");
const entity_1 = require("../entity");
class BaseResState {
}
exports.BaseResState = BaseResState;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4035 }),
    __metadata("design:type", Number)
], BaseResState.prototype, "state_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Tamil Nadu' }),
    __metadata("design:type", String)
], BaseResState.prototype, "state_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'TN' }),
    __metadata("design:type", String)
], BaseResState.prototype, "state_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '11.12712250' }),
    __metadata("design:type", String)
], BaseResState.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '78.65689420' }),
    __metadata("design:type", String)
], BaseResState.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'state' }),
    __metadata("design:type", Function)
], BaseResState.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3 }),
    __metadata("design:type", String)
], BaseResState.prototype, "region_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => entity_1.BaseResRegion }),
    __metadata("design:type", entity_1.BaseResRegion)
], BaseResState.prototype, "region", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 14 }),
    __metadata("design:type", String)
], BaseResState.prototype, "subregion_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => entity_1.BaseResSubregion }),
    __metadata("design:type", entity_1.BaseResSubregion)
], BaseResState.prototype, "subregion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 101 }),
    __metadata("design:type", String)
], BaseResState.prototype, "country_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => entity_1.BaseResCountry }),
    __metadata("design:type", entity_1.BaseResCountry)
], BaseResState.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => entity_1.BaseResCity, isArray: true }),
    __metadata("design:type", Array)
], BaseResState.prototype, "cities", void 0);
class GetResStates extends (0, swagger_1.PickType)(BaseResState, [
    'state_id',
    'state_name',
]) {
}
exports.GetResStates = GetResStates;
class GetResStateDetail extends (0, swagger_1.OmitType)(BaseResState, [
    'region_id',
    'subregion_id',
    'country_id',
]) {
}
exports.GetResStateDetail = GetResStateDetail;
class EntityGetStates extends utils_1.BaseResponse {
}
exports.EntityGetStates = EntityGetStates;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => GetResStates, isArray: true }),
    __metadata("design:type", Array)
], EntityGetStates.prototype, "result", void 0);
class EntityGetStateDetail extends utils_1.BaseResponse {
}
exports.EntityGetStateDetail = EntityGetStateDetail;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => GetResStateDetail }),
    __metadata("design:type", GetResStateDetail)
], EntityGetStateDetail.prototype, "result", void 0);
//# sourceMappingURL=state.entity.js.map
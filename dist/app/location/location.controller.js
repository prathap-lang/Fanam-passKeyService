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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const session_interceptor_1 = require("interceptors/session.interceptor");
const utils_1 = require("../../utils");
const entity_1 = require("./entity");
const location_service_1 = require("./location.service");
let LocationController = class LocationController {
    constructor(service) {
        this.service = service;
    }
    async findAllRegions() {
        const result = await this.service.getRegions();
        return new utils_1.AppResponse(result, 'Fetched All Regions Successfully');
    }
    async findRegionDetail(region_id) {
        const result = await this.service.getRegionDetail(+region_id);
        return new utils_1.AppResponse(result, 'Fetched Region Detail Successfully');
    }
    async findAllSubregions() {
        const result = await this.service.getSubregions();
        return new utils_1.AppResponse(result, 'Fetched All Subregions Successfully');
    }
    async findSubregionDetail(subregion_id) {
        const result = await this.service.getSubregionDetail(+subregion_id);
        return new utils_1.AppResponse(result, 'Fetched Subregion Detail Successfully');
    }
    async findAllCountries(country_id) {
        const result = await this.service.getCountries(+country_id);
        return new utils_1.AppResponse(result, 'Fetched All Countries Successfully');
    }
    async findCountryDetail(country_id) {
        const result = await this.service.findOne(+country_id);
        return new utils_1.AppResponse(result, 'Fetched Country by id Successfully');
    }
    async findAllStatesByCountry(country_id) {
        const result = await this.service.getStates(+country_id);
        return new utils_1.AppResponse(result, 'Fetched All States by country Successfully');
    }
    async findStateDetail(state_id) {
        const result = await this.service.getCities(+state_id);
        return new utils_1.AppResponse(result, 'Fetched All Cities Successfully');
    }
};
exports.LocationController = LocationController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(session_interceptor_1.SessionInterceptor),
    (0, swagger_1.ApiOperation)({ summary: 'Get All Regions' }),
    (0, swagger_1.ApiOkResponse)({ type: entity_1.EntityGetRegions }),
    (0, common_1.Get)('all-regions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "findAllRegions", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(session_interceptor_1.SessionInterceptor),
    (0, swagger_1.ApiOperation)({ summary: 'Get Region Detail' }),
    (0, swagger_1.ApiOkResponse)({ type: entity_1.EntityGetRegionDetail }),
    (0, common_1.Get)('region/:region_id'),
    __param(0, (0, common_1.Param)('region_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "findRegionDetail", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(session_interceptor_1.SessionInterceptor),
    (0, swagger_1.ApiOperation)({ summary: 'Get All Regions' }),
    (0, swagger_1.ApiOkResponse)({ type: entity_1.EntityGetSubregions }),
    (0, common_1.Get)('all-subregions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "findAllSubregions", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(session_interceptor_1.SessionInterceptor),
    (0, swagger_1.ApiOperation)({ summary: 'Get Subregion Detail' }),
    (0, swagger_1.ApiOkResponse)({ type: entity_1.EntityGetSubregionDetail }),
    (0, common_1.Get)('subregion/:subregion_id'),
    __param(0, (0, common_1.Param)('subregion_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "findSubregionDetail", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get All Countries' }),
    (0, swagger_1.ApiOkResponse)({ type: entity_1.EntityGetCountries }),
    (0, common_1.Get)('all-countries'),
    (0, swagger_1.ApiQuery)({
        name: 'country_id',
        required: false,
    }),
    __param(0, (0, common_1.Query)('country_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "findAllCountries", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(session_interceptor_1.SessionInterceptor),
    (0, swagger_1.ApiOperation)({ summary: 'Get Country Detail' }),
    (0, swagger_1.ApiOkResponse)({ type: entity_1.EntityGetCountryDetail }),
    (0, common_1.Get)('countries/:country_id/detail'),
    __param(0, (0, common_1.Param)('country_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "findCountryDetail", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(session_interceptor_1.SessionInterceptor),
    (0, swagger_1.ApiOperation)({ summary: 'Get states by country' }),
    (0, swagger_1.ApiOkResponse)({ type: entity_1.EntityGetCountryDetail }),
    (0, common_1.Get)('countries/:country_id'),
    __param(0, (0, common_1.Param)('country_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "findAllStatesByCountry", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(session_interceptor_1.SessionInterceptor),
    (0, swagger_1.ApiOperation)({ summary: 'Get State Detail' }),
    (0, swagger_1.ApiOkResponse)({ type: entity_1.EntityGetCountryDetail }),
    (0, common_1.Get)('states/:state_id'),
    __param(0, (0, common_1.Param)('state_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "findStateDetail", null);
exports.LocationController = LocationController = __decorate([
    (0, common_1.Controller)('location'),
    (0, swagger_1.ApiBadRequestResponse)({ type: utils_1.EntityErrorResponse }),
    (0, swagger_1.ApiTags)('Locations'),
    __metadata("design:paramtypes", [location_service_1.LocationService])
], LocationController);
//# sourceMappingURL=location.controller.js.map
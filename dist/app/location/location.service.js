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
exports.LocationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let LocationService = class LocationService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getRegions() {
        return await this.prisma.region.findMany();
    }
    async getRegionDetail(region_id) {
        const result = await this.prisma.region.findUnique({
            where: { region_id },
        });
        if (!result)
            throw new common_1.NotFoundException('Region not found');
        return result;
    }
    async getSubregions() {
        return await this.prisma.subregion.findMany({
            select: { subregion_id: true, subregion_name: true },
        });
    }
    async getSubregionDetail(subregion_id) {
        const result = await this.prisma.subregion.findUnique({
            where: { subregion_id },
            select: {
                subregion_id: true,
                subregion_name: true,
            },
        });
        if (!result)
            throw new common_1.NotFoundException('Subregion not found');
        return result;
    }
    async getCountries(country_id) {
        const whereCondition = {
            is_active: true,
        };
        if (country_id) {
            const country = await this.prisma.country.findUnique({
                where: {
                    country_id,
                    is_active: true,
                },
            });
            if (!country) {
                throw new common_1.NotFoundException('Country not found');
            }
            whereCondition.currency = {
                not: country.currency,
            };
        }
        return await this.prisma.country.findMany({
            where: whereCondition,
            orderBy: { country_name: 'asc' },
            select: {
                country_id: true,
                country_name: true,
                iso2: true,
                currency: true,
                emojiU: true,
                emoji: true,
                phone_code: true,
                bankInputs: true,
            },
        });
    }
    async findOne(country_id) {
        const result = await this.prisma.country.findUnique({
            where: { country_id, is_active: true },
            select: {
                country_id: true,
                country_name: true,
                iso2: true,
                currency: true,
                emojiU: true,
                phone_code: true,
                bankInputs: true,
            },
        });
        if (!result)
            throw new common_1.NotFoundException('Country not found');
        return result;
    }
    async getStates(country_id) {
        if (!country_id)
            throw new common_1.BadRequestException("Please enter valid 'country_id'");
        const result = await this.prisma.state.findMany({
            where: { country_id },
            orderBy: {
                state_name: 'asc',
            },
            select: {
                state_id: true,
                state_name: true,
            },
        });
        return result;
    }
    async getCities(state_id) {
        const result = await this.prisma.city.findMany({
            where: { state_id },
            orderBy: {
                city_name: 'asc',
            },
            select: {
                city_id: true,
                city_name: true,
            },
        });
        return result;
    }
};
exports.LocationService = LocationService;
exports.LocationService = LocationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LocationService);
//# sourceMappingURL=location.service.js.map
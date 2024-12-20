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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return await this.prisma.user.findMany({});
    }
    async findOne(user_id) {
        const user = await this.prisma.user.findUnique({
            where: { user_id },
            include: {
                country: {
                    select: {
                        country_name: true,
                        iso2: true,
                        iso3: true,
                        currency: true,
                        country_id: true,
                        currency_symbol: true,
                        emoji: true,
                        emojiU: true,
                        phone_code: true,
                        bankInputs: true,
                    },
                },
                state: {
                    select: {
                        state_id: true,
                        state_name: true,
                    },
                },
                city: { select: { city_id: true, city_name: true } },
            },
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async getProfile({ user_id }) {
        const result = await this.prisma.user.findUnique({
            where: { user_id },
            select: {
                user_id: true,
                first_name: true,
                last_name: true,
                business_name: true,
                email: true,
                phone_no: true,
                date_of_birth: true,
                address_line_1: true,
                address_line_2: true,
                account_no: true,
                account_type: true,
                country: {
                    select: {
                        country_name: true,
                        iso2: true,
                        iso3: true,
                        currency: true,
                        country_id: true,
                        currency_symbol: true,
                        emoji: true,
                        emojiU: true,
                        phone_code: true,
                        bankInputs: true,
                    },
                },
                state: {
                    select: {
                        state_id: true,
                        state_name: true,
                    },
                },
                city: { select: { city_id: true, city_name: true } },
                zip_code: true,
                status: true,
            },
        });
        if (!result)
            throw new common_1.NotFoundException('User not found');
        return result;
    }
    async update(user_id, { first_name, last_name, }) {
        const user = await this.findOne(user_id);
        const data = {
            first_name,
            last_name,
        };
        const result = await this.prisma.user.update({
            where: { user_id },
            data,
            include: {
                country: {
                    select: {
                        country_id: true,
                        country_name: true,
                        iso2: true,
                        iso3: true,
                        currency: true,
                        emojiU: true,
                        phone_code: true,
                        bankInputs: true,
                    },
                },
                state: {
                    select: {
                        state_id: true,
                        state_name: true,
                    },
                },
                city: { select: { city_id: true, city_name: true } },
            },
        });
        return result;
    }
    async syncUser({ user_id }, body) {
        const { first_name, last_name, } = body;
        const user = await this.prisma.user.findUnique({
            where: { user_id },
        });
        const data = {
            first_name,
            last_name,
        };
        return await this.prisma.user.update({
            where: { user_id },
            data,
            include: {
                country: {
                    select: {
                        country_id: true,
                        country_name: true,
                        iso2: true,
                        iso3: true,
                        currency: true,
                        emojiU: true,
                        phone_code: true,
                        bankInputs: true,
                    },
                },
                state: {
                    select: {
                        state_id: true,
                        state_name: true,
                    },
                },
                city: { select: { city_id: true, city_name: true } },
            },
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map
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
exports.BeneficiaryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let BeneficiaryService = class BeneficiaryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create({ first_name, last_name, relationship, account_no, address, notes, zip_code, state_id, phone_no, email, country_id, city_id, }, { user_id }) {
        const country = await this.prisma.country.findUnique({
            where: { country_id, is_active: true },
        });
        const state = await this.prisma.state.findUnique({ where: { state_id } });
        const city = await this.prisma.city.findUnique({ where: { city_id } });
        if (!state)
            throw new common_1.NotFoundException('State not found');
        if (!city)
            throw new common_1.NotFoundException('City not found');
        if (!country)
            throw new common_1.NotFoundException('Country not found');
        const data = {
            first_name,
            last_name,
            relationship,
            account_no,
            email,
            country: { connect: { country_id } },
            phone_no,
            address,
            notes,
            state: { connect: { state_id } },
            city: { connect: { city_id } },
            zip_code,
            created_by: { connect: { user_id } },
        };
        const beneficiary = await this.prisma.beneficiary.create({
            data,
            include: {
                country: {
                    select: {
                        country_id: true,
                        country_name: true,
                        iso2: true,
                        currency: true,
                        emojiU: true,
                        phone_code: true,
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
        return beneficiary;
    }
    async findAll({ user_id }) {
        return await this.prisma.beneficiary.findMany({
            where: { created_by: { user_id } },
            orderBy: [{ first_name: 'asc' }, { last_name: 'asc' }],
            include: {
                country: {
                    select: {
                        country_id: true,
                        country_name: true,
                        iso2: true,
                        currency: true,
                        emojiU: true,
                        phone_code: true,
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
    async findOne(beneficiary_id, { user_id }) {
        const beneficiary = await this.prisma.beneficiary.findUnique({
            where: { beneficiary_id, created_by: { user_id } },
            include: {
                country: {
                    select: {
                        country_id: true,
                        country_name: true,
                        iso2: true,
                        currency: true,
                        emojiU: true,
                        phone_code: true,
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
        if (!beneficiary)
            throw new common_1.NotFoundException('Beneficiary not found');
        return beneficiary;
    }
    async update(beneficiary_id, { first_name, last_name, relationship, account_no, address, notes, zip_code, city_id, state_id, country_id, phone_no, email, }) {
        const data = {
            first_name,
            last_name,
            relationship,
            account_no,
            address,
            notes,
            zip_code,
            phone_no,
            email,
        };
        if (country_id) {
            const country = await this.prisma.country.findUnique({
                where: { country_id, is_active: true },
            });
            if (!country)
                throw new common_1.NotFoundException('Country not found');
            data.country = { connect: { country_id } };
        }
        if (state_id) {
            const state = await this.prisma.state.findUnique({ where: { state_id } });
            if (!state)
                throw new common_1.NotFoundException('State not found');
            data.state = { connect: { state_id } };
        }
        if (city_id) {
            const city = await this.prisma.city.findUnique({ where: { city_id } });
            if (!city)
                throw new common_1.NotFoundException('City not found');
            data.city = { connect: { city_id } };
        }
        return await this.prisma.beneficiary.update({
            where: { beneficiary_id },
            data,
            include: {
                country: {
                    select: {
                        country_id: true,
                        country_name: true,
                        iso2: true,
                        currency: true,
                        emojiU: true,
                        phone_code: true,
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
exports.BeneficiaryService = BeneficiaryService;
exports.BeneficiaryService = BeneficiaryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BeneficiaryService);
//# sourceMappingURL=beneficiary.service.js.map
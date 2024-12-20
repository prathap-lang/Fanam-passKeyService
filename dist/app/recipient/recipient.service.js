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
exports.RecipientService = void 0;
const common_1 = require("@nestjs/common");
const helper_1 = require("../../helper");
const prisma_service_1 = require("../../prisma/prisma.service");
const utils_1 = require("../../utils");
let RecipientService = class RecipientService {
    constructor(prisma, azure) {
        this.prisma = prisma;
        this.azure = azure;
    }
    async create(body, user) {
        const { user_id } = user;
        const { recipient_account_type, first_name, last_name, business_name, email, address_line_1, address_line_2, city_id, state_id, country_id, zip_code, is_send_email, phone_no, id_type, id_number, id_issued_country_id, bank_account, } = body;
        const { account_no, iban_no, swift_code, bsb_code, routing_code, bank_name, branch_code, bank_code_type, branch_address, account_type, } = bank_account;
        if (recipient_account_type === utils_1.AccountType.INDIVIDUAL && business_name)
            throw new common_1.BadRequestException('Business Name not applicable for account_type Individual ');
        const country = await this.prisma.country.findUnique({
            where: { country_id, is_active: true },
        });
        const state = await this.prisma.state.findUnique({ where: { state_id } });
        const city = await this.prisma.city.findUnique({ where: { city_id } });
        if (!country)
            throw new common_1.NotFoundException('Country not found');
        if (!state)
            throw new common_1.NotFoundException('State not found');
        if (!city)
            throw new common_1.NotFoundException('City not found');
        const data = {
            recipient_account_type,
            first_name,
            last_name,
            business_name,
            email,
            address_line_1,
            address_line_2,
            phone_no,
            is_send_email,
            id_type,
            id_number,
            id_issued_country: { connect: { country_id: id_issued_country_id } },
            country: { connect: { country_id } },
            city: { connect: { city_id } },
            state: { connect: { state_id } },
            zip_code,
            created_by: { connect: { user_id } },
            bank_account: {
                create: {
                    account_holder: `${first_name} ${last_name}`,
                    account_no,
                    iban_no,
                    bsb_code,
                    swift_code,
                    routing_code,
                    bank_name,
                    branch_code,
                    bank_code_type,
                    branch_address,
                    account_type,
                    created_by: {
                        connect: { user_id },
                    },
                },
            },
        };
        const recipient = await this.prisma.recipient.create({
            data,
            include: {
                bank_account: {
                    select: {
                        account_id: true,
                        account_type: true,
                        account_no: true,
                        account_holder: true,
                        bank_name: true,
                        branch_code: true,
                        bank_code_type: true,
                        branch_address: true,
                        bsb_code: true,
                        iban_no: true,
                        routing_code: true,
                        swift_code: true,
                    },
                },
                country: {
                    select: {
                        country_id: true,
                        country_name: true,
                        iso2: true,
                        iso3: true,
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
                id_issued_country: {
                    select: {
                        country_id: true,
                        country_name: true,
                        iso2: true,
                        iso3: true,
                        currency: true,
                        emojiU: true,
                        phone_code: true,
                    },
                },
            },
        });
        return recipient;
    }
    async findAll(recipient_type, user) {
        const whereCondition = {
            created_by_id: user.user_id,
        };
        if (recipient_type) {
            whereCondition.recipient_account_type = recipient_type;
        }
        const recipients = await this.prisma.recipient.findMany({
            where: whereCondition,
            orderBy: { first_name: 'asc' },
            include: {
                bank_account: {
                    select: {
                        account_id: true,
                        account_type: true,
                        account_no: true,
                        account_holder: true,
                        bank_name: true,
                        branch_code: true,
                        bank_code_type: true,
                        branch_address: true,
                        bsb_code: true,
                        iban_no: true,
                        routing_code: true,
                        swift_code: true,
                    },
                },
                country: {
                    select: {
                        country_id: true,
                        country_name: true,
                        iso2: true,
                        iso3: true,
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
                id_issued_country: {
                    select: {
                        country_id: true,
                        country_name: true,
                        iso2: true,
                        iso3: true,
                        currency: true,
                        emojiU: true,
                        phone_code: true,
                    },
                },
                kyc_attachments: {
                    select: { mime: true, file_name: true, attachment_id: true },
                },
            },
        });
        for (const recipient of recipients) {
            if (recipient?.kyc_attachments.length) {
                recipient.kyc_attachments = recipient.kyc_attachments.map(({ file_name, attachment_id, mime }) => ({
                    file_name,
                    attachment_id,
                    mime,
                    url: this.azure.generateSASUrl(file_name, 'recipient-kyc'),
                }));
            }
        }
        return recipients;
    }
    async findOne(recipient_id, { user_id }) {
        const recipient = await this.prisma.recipient.findUnique({
            where: { recipient_id, created_by: { user_id } },
            include: {
                bank_account: {
                    select: {
                        account_id: true,
                        account_no: true,
                        account_type: true,
                        account_holder: true,
                        bank_name: true,
                        branch_code: true,
                        bank_code_type: true,
                        branch_address: true,
                        bsb_code: true,
                        iban_no: true,
                        routing_code: true,
                        swift_code: true,
                    },
                },
                country: {
                    select: {
                        country_id: true,
                        country_name: true,
                        iso2: true,
                        iso3: true,
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
                id_issued_country: {
                    select: {
                        country_id: true,
                        country_name: true,
                        iso2: true,
                        iso3: true,
                        currency: true,
                        emojiU: true,
                        phone_code: true,
                    },
                },
                kyc_attachments: {
                    select: { mime: true, file_name: true, attachment_id: true },
                },
            },
        });
        if (!recipient)
            throw new common_1.NotFoundException('Recipient not found');
        if (recipient.kyc_attachments.length) {
            recipient.kyc_attachments = recipient.kyc_attachments.map(({ file_name, attachment_id, mime }) => ({
                file_name,
                attachment_id,
                mime,
                url: this.azure.generateSASUrl(file_name, 'recipient-kyc'),
            }));
        }
        return recipient;
    }
    async update(recipient_id, { recipient_account_type, first_name, last_name, business_name, email, address_line_1, address_line_2, city_id, state_id, country_id, zip_code, is_send_email, phone_no, id_type, id_number, id_issued_country_id, bank_account, }, user) {
        const fetchedRecipient = await this.findOne(recipient_id, user);
        if ((recipient_account_type
            ? recipient_account_type
            : fetchedRecipient.recipient_account_type) === utils_1.AccountType.INDIVIDUAL &&
            business_name)
            throw new common_1.BadRequestException('Business Name not applicable for account_type Individual ');
        const data = {
            recipient_account_type,
            first_name,
            last_name,
            business_name,
            email,
            address_line_1,
            address_line_2,
            phone_no,
            is_send_email,
            id_number,
            id_type,
            zip_code,
        };
        data.bank_account = {
            update: {
                ...bank_account,
            },
        };
        if (country_id) {
            const country = await this.prisma.country.findUnique({
                where: { country_id, is_active: true },
            });
            if (!country)
                throw new common_1.NotFoundException('Country not found');
            data.country = { connect: { country_id } };
        }
        if (id_issued_country_id) {
            const issuedCountry = await this.prisma.country.findUnique({
                where: { country_id: id_issued_country_id, is_active: true },
            });
            if (!issuedCountry)
                throw new common_1.NotFoundException('ID issued Country not found');
            data.id_issued_country = {
                connect: { country_id: id_issued_country_id },
            };
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
        const recipient = await this.prisma.recipient.update({
            where: { recipient_id },
            include: {
                bank_account: {
                    select: {
                        account_id: true,
                        account_type: true,
                        account_no: true,
                        account_holder: true,
                        bank_name: true,
                        branch_code: true,
                        bank_code_type: true,
                        branch_address: true,
                        bsb_code: true,
                        iban_no: true,
                        routing_code: true,
                        swift_code: true,
                    },
                },
                country: {
                    select: {
                        country_id: true,
                        country_name: true,
                        iso2: true,
                        iso3: true,
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
                id_issued_country: {
                    select: {
                        country_id: true,
                        country_name: true,
                        iso2: true,
                        iso3: true,
                        currency: true,
                        emojiU: true,
                        phone_code: true,
                    },
                },
                kyc_attachments: {
                    select: { mime: true, file_name: true, attachment_id: true },
                },
            },
            data,
        });
        if (recipient?.kyc_attachments.length) {
            recipient.kyc_attachments = recipient.kyc_attachments.map(({ file_name, attachment_id, mime }) => ({
                file_name,
                attachment_id,
                mime,
                url: this.azure.generateSASUrl(file_name, 'recipient-kyc'),
            }));
        }
        return recipient;
    }
};
exports.RecipientService = RecipientService;
exports.RecipientService = RecipientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        helper_1.AzureHelper])
], RecipientService);
//# sourceMappingURL=recipient.service.js.map
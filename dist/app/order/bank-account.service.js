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
exports.BankAccountService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let BankAccountService = class BankAccountService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createRecipientBankAccount({ account_holder, account_no, iban_no, swift_code, routing_code, bank_name, branch_code, branch_address, account_type, account_holer_id, }, { user_id }) {
        const data = {
            account_holder,
            account_no,
            iban_no,
            swift_code,
            routing_code,
            bank_name,
            branch_code,
            branch_address,
            account_type,
            created_by: {
                connect: { user_id },
            },
        };
        const recipient = await this.prisma.recipient.findUnique({
            where: { recipient_id: account_holer_id },
            select: { recipient_id: true },
        });
        if (!recipient)
            throw new common_1.NotFoundException('Recipient not found');
        data.recipient = { connect: { recipient_id: recipient.recipient_id } };
        return await this.prisma.recipientBankAccount.create({
            data,
            include: {
                recipient: {
                    select: {
                        recipient_id: true,
                        first_name: true,
                        last_name: true,
                        email: true,
                    },
                },
            },
        });
    }
    async createSenderBankAccount({ account_no, account_type }, { user_id }) {
        const data = {
            account_no,
            account_type,
            created_by: {
                connect: { user_id },
            },
        };
        return await this.prisma.senderBankAccount.create({
            data,
            include: {
                created_by: {
                    select: {
                        user_id: true,
                        first_name: true,
                        last_name: true,
                        email: true,
                    },
                },
            },
        });
    }
    async findAll() {
        return await this.prisma.recipientBankAccount.findMany({
            include: {
                recipient: {
                    select: {
                        recipient_id: true,
                        first_name: true,
                        last_name: true,
                        email: true,
                    },
                },
            },
        });
    }
    async myAccounts({ user_id }) {
        return await this.prisma.senderBankAccount.findMany({
            where: { created_by: { user_id } },
            include: {
                created_by: {
                    select: {
                        user_id: true,
                        first_name: true,
                        last_name: true,
                        email: true,
                    },
                },
            },
        });
    }
    async recipientBankAccountDetail(account_id) {
        const bankAccount = await this.prisma.recipientBankAccount.findUnique({
            where: { account_id },
            include: {
                recipient: {
                    select: {
                        recipient_id: true,
                        first_name: true,
                        last_name: true,
                        email: true,
                    },
                },
            },
        });
        if (!bankAccount)
            throw new common_1.NotFoundException('Bank account not found');
        return bankAccount;
    }
    async senderBankAccountDetail(account_id) {
        const bankAccount = await this.prisma.senderBankAccount.findUnique({
            where: { account_id },
            include: {
                created_by: {
                    select: {
                        user_id: true,
                        first_name: true,
                        last_name: true,
                        email: true,
                    },
                },
            },
        });
        if (!bankAccount)
            throw new common_1.NotFoundException('Bank account not found');
        return bankAccount;
    }
    async update(account_id, { account_holder, account_no, iban_no, swift_code, routing_code, bank_name, branch_code, branch_address, account_type, }) {
        const data = {
            account_holder,
            account_no,
            iban_no,
            swift_code,
            routing_code,
            bank_name,
            branch_code,
            branch_address,
            account_type,
        };
        return await this.prisma.recipientBankAccount.update({
            where: { account_id },
            data,
            include: {
                recipient: {
                    select: {
                        recipient_id: true,
                        first_name: true,
                        last_name: true,
                        email: true,
                    },
                },
            },
        });
    }
};
exports.BankAccountService = BankAccountService;
exports.BankAccountService = BankAccountService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BankAccountService);
//# sourceMappingURL=bank-account.service.js.map
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
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const helper_1 = require("../../helper");
const prisma_service_1 = require("../../prisma/prisma.service");
const utils_1 = require("../../utils");
let TransactionService = class TransactionService {
    constructor(prisma, azure) {
        this.prisma = prisma;
        this.azure = azure;
    }
    async create({ recipient_id }, { user_id }) {
        const recipient = await this.prisma.recipient.findUnique({
            where: {
                recipient_id: recipient_id,
            },
            include: { bank_account: true },
        });
        const user = await this.prisma.user.findUnique({
            where: {
                user_id: user_id,
            },
        });
        if (!user)
            throw new common_1.NotFoundException('User not found ');
        if (!recipient)
            throw new common_1.NotFoundException('Recipient  not found ');
        if (!recipient.bank_account)
            throw new common_1.NotFoundException('Recipient bank account not found ');
        const data = {
            status: utils_1.TransactionStatus.RECIPIENT_PICKED,
            created_by: {
                connect: { user_id },
            },
            recipient: {
                connect: { recipient_id: recipient.recipient_id },
            },
            recipient_account_type: recipient.recipient_account_type,
            sender_account_type: user.account_type,
        };
        const transaction = await this.prisma.transaction.create({
            data,
            include: {
                created_by: true,
                recipient: {
                    select: {
                        recipient_id: true,
                        first_name: true,
                        last_name: true,
                        email: true,
                        phone_no: true,
                        is_same_person: true,
                        relationship: true,
                        is_send_email: true,
                        address_line_1: true,
                        address_line_2: true,
                        zip_code: true,
                        country: {
                            select: {
                                country_id: true,
                                country_name: true,
                                currency: true,
                                phone_code: true,
                            },
                        },
                        state: { select: { state_id: true, state_name: true } },
                        city: { select: { city_id: true, city_name: true } },
                        bank_account: {
                            select: {
                                account_id: true,
                                account_no: true,
                                account_holder: true,
                                account_type: true,
                                bank_name: true,
                                branch_address: true,
                                bank_code_type: true,
                                branch_code: true,
                                bsb_code: true,
                                iban_no: true,
                                routing_code: true,
                                swift_code: true,
                            },
                        },
                        id_number: true,
                        id_type: true,
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
                },
                source_country: {
                    select: {
                        country_id: true,
                        country_name: true,
                        iso2: true,
                        currency: true,
                        emojiU: true,
                        phone_code: true,
                    },
                },
                destination_country: {
                    select: {
                        country_id: true,
                        country_name: true,
                        iso2: true,
                        currency: true,
                        emojiU: true,
                        phone_code: true,
                    },
                },
            },
        });
        delete transaction.status;
        return transaction;
    }
    async findAll({ user_id }, start_date, end_date, status) {
        const whereCondition = {
            created_by: { user_id },
            order: { isNot: null },
        };
        whereCondition.order = {
            order_status: {
                in: [
                    utils_1.TransactionFilterOrderStatus.TRANSACTION_CANCELED,
                    utils_1.TransactionFilterOrderStatus.TRANSACTION_FAILURE,
                    utils_1.TransactionFilterOrderStatus.TRANSACTION_SUCCESS,
                    utils_1.TransactionFilterOrderStatus.PAYMENT_IN_TRANSITION,
                    utils_1.TransactionFilterOrderStatus.REFUND_INITIATED,
                    utils_1.TransactionFilterOrderStatus.REFUND_IN_PROGRESS,
                    utils_1.TransactionFilterOrderStatus.REFUND_SUCCESSFUL,
                    utils_1.TransactionFilterOrderStatus.REFUND_FAILED,
                    utils_1.TransactionFilterOrderStatus.TRANSACTION_PENDING,
                ],
            },
        };
        if (start_date || end_date) {
            const start_date_Time = start_date
                ? new Date(start_date).toISOString().slice(0, 10)
                : null;
            const start_time = start_date_Time
                ? new Date(`${start_date_Time} 00:00:00.000`)
                : null;
            const end_date_time = end_date
                ? new Date(end_date).toISOString().slice(0, 10)
                : null;
            const end_time = end_date_time
                ? new Date(`${end_date_time} 23:59:59.999`)
                : null;
            if (start_date && end_date) {
                whereCondition.created_at = {
                    gte: start_time,
                    lte: end_time,
                };
            }
            else if (start_date) {
                whereCondition.created_at = {
                    gte: start_time,
                };
            }
            else if (end_date) {
                whereCondition.created_at = {
                    lte: end_time,
                };
            }
        }
        if (status) {
            whereCondition.order = {
                order_status: { equals: status },
            };
        }
        const transactions = await this.prisma.transaction.findMany({
            where: whereCondition,
            orderBy: { updated_at: 'desc' },
            include: {
                created_by: true,
                beneficiary: {
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
                        state: { select: { state_id: true, state_name: true } },
                        city: { select: { city_id: true, city_name: true } },
                    },
                },
                recipient: {
                    select: {
                        recipient_id: true,
                        first_name: true,
                        last_name: true,
                        email: true,
                        phone_no: true,
                        is_same_person: true,
                        relationship: true,
                        is_send_email: true,
                        address_line_1: true,
                        address_line_2: true,
                        zip_code: true,
                        country: {
                            select: {
                                country_id: true,
                                country_name: true,
                                currency: true,
                                phone_code: true,
                            },
                        },
                        state: { select: { state_id: true, state_name: true } },
                        city: { select: { city_id: true, city_name: true } },
                        bank_account: {
                            select: {
                                account_id: true,
                                account_no: true,
                                account_holder: true,
                                account_type: true,
                                bank_name: true,
                                branch_address: true,
                                bank_code_type: true,
                                branch_code: true,
                                swift_code: true,
                            },
                        },
                        id_number: true,
                        id_type: true,
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
                },
                order: {
                    select: {
                        order_id: true,
                        order_no: true,
                        amount: true,
                        razorpay_order_id: true,
                        order_status: true,
                        payout_id: true,
                        client_reference_id: true,
                        proposal_id: true,
                        cancel_reason: true,
                        initiating_party_id: true,
                        fx_conversion_rate: true,
                        payment_status: true,
                        payout_speed: true,
                        payment: {
                            select: {
                                payment_id: true,
                                razorpay_payment_id: true,
                                paymentMethod: true,
                                invoiceId: true,
                                status: true,
                                amount: true,
                            },
                        },
                    },
                },
                transfer_time: true,
                source_country: {
                    select: {
                        country_id: true,
                        country_name: true,
                        iso2: true,
                        currency: true,
                        emojiU: true,
                        phone_code: true,
                    },
                },
                destination_country: {
                    select: {
                        country_id: true,
                        country_name: true,
                        iso2: true,
                        currency: true,
                        emojiU: true,
                        phone_code: true,
                    },
                },
            },
        });
        transactions.forEach((it) => delete it.status);
        return transactions;
    }
    async findOne(transaction_id, { user_id }) {
        const transaction = await this.prisma.transaction.findUnique({
            where: { transaction_id, created_by: { user_id } },
            include: {
                created_by: true,
                beneficiary: {
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
                },
                recipient: {
                    select: {
                        business_name: true,
                        recipient_id: true,
                        first_name: true,
                        last_name: true,
                        email: true,
                        phone_no: true,
                        is_same_person: true,
                        relationship: true,
                        is_send_email: true,
                        address_line_1: true,
                        address_line_2: true,
                        zip_code: true,
                        country: true,
                        state: { select: { state_id: true, state_name: true } },
                        city: { select: { city_id: true, city_name: true } },
                        bank_account: {
                            select: {
                                account_id: true,
                                account_no: true,
                                account_holder: true,
                                account_type: true,
                                bank_name: true,
                                branch_address: true,
                                bank_code_type: true,
                                branch_code: true,
                                bsb_code: true,
                                iban_no: true,
                                routing_code: true,
                                swift_code: true,
                            },
                        },
                        id_number: true,
                        id_type: true,
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
                },
                order: {
                    select: {
                        order_id: true,
                        order_no: true,
                        amount: true,
                        razorpay_order_id: true,
                        order_status: true,
                        payout_id: true,
                        client_reference_id: true,
                        proposal_id: true,
                        cancel_reason: true,
                        initiating_party_id: true,
                        fx_conversion_rate: true,
                        payment_status: true,
                        payout_speed: true,
                        payment: {
                            select: {
                                payment_id: true,
                                razorpay_payment_id: true,
                                paymentMethod: true,
                                invoiceId: true,
                                status: true,
                                amount: true,
                            },
                        },
                    },
                },
                invoice: {
                    select: { mime: true, file_name: true, attachment_id: true },
                },
                reconciliation_report: {
                    select: { mime: true, file_name: true, attachment_id: true },
                },
                transfer_time: true,
                source_country: true,
                destination_country: true,
            },
        });
        if (!transaction)
            throw new common_1.NotFoundException('Transaction not found');
        if (transaction.invoice.length) {
            transaction.invoice = transaction.invoice.map(({ attachment_id, file_name, mime }) => ({
                mime,
                attachment_id,
                url: this.azure.generateSASUrl(file_name, 'invoice'),
                file_name,
            }));
        }
        if (transaction.recipient?.kyc_attachments?.length) {
            transaction.recipient.kyc_attachments =
                transaction.recipient.kyc_attachments.map(({ attachment_id, file_name, mime }) => ({
                    mime,
                    attachment_id,
                    url: this.azure.generateSASUrl(file_name, 'recipient-kyc'),
                    file_name,
                }));
        }
        if (transaction.reconciliation_report) {
            const { attachment_id, file_name, mime } = transaction.reconciliation_report;
            transaction.reconciliation_report = {
                mime,
                attachment_id,
                url: this.azure.generateSASUrl(file_name, 'reconciliation-report'),
                file_name,
            };
        }
        delete transaction.status;
        return transaction;
    }
    async update(transaction_id, { recipient_id, beneficiary_id, source_country_id, destination_country_id, exchange_amount, transfer_time_id, visa_quote_id, destination_amount, purpose, reason, recipient_relationship, is_same_person, }, { user_id }) {
        const transaction = await this.prisma.transaction.findUnique({
            where: { transaction_id, is_checkout: false },
            include: {
                recipient: {
                    include: {
                        bank_account: { select: { account_no: true } },
                        country: { select: { country_id: true } },
                        state: true,
                        city: true,
                    },
                },
            },
        });
        if (!transaction) {
            throw new common_1.NotFoundException('Transaction not found');
        }
        if (!transaction.recipient_id) {
            if (beneficiary_id ||
                source_country_id ||
                destination_country_id ||
                exchange_amount ||
                transfer_time_id ||
                visa_quote_id ||
                destination_amount ||
                recipient_relationship ||
                is_same_person ||
                purpose ||
                reason) {
                throw new common_1.NotFoundException('Recipient not found in this transaction');
            }
        }
        else {
            if (recipient_id &&
                (beneficiary_id ||
                    source_country_id ||
                    destination_country_id ||
                    exchange_amount ||
                    transfer_time_id ||
                    visa_quote_id ||
                    destination_amount ||
                    recipient_relationship ||
                    is_same_person ||
                    purpose ||
                    reason)) {
                throw new common_1.NotFoundException('Invalid Input');
            }
        }
        if (transaction.beneficiary_id) {
            if (beneficiary_id &&
                (recipient_id ||
                    source_country_id ||
                    destination_country_id ||
                    exchange_amount ||
                    transfer_time_id ||
                    visa_quote_id ||
                    destination_amount ||
                    recipient_relationship ||
                    is_same_person ||
                    purpose ||
                    reason)) {
                throw new common_1.NotFoundException('Invalid Input');
            }
        }
        if (((source_country_id ||
            destination_country_id ||
            exchange_amount ||
            transfer_time_id ||
            destination_amount) &&
            (!source_country_id ||
                !destination_country_id ||
                !exchange_amount ||
                !transfer_time_id ||
                !destination_amount)) ||
            ((purpose || reason) && (!purpose || !reason)) ||
            ((is_same_person || recipient_relationship) &&
                (!is_same_person || !recipient_relationship))) {
            throw new common_1.NotFoundException('Invalid Input');
        }
        if (transaction.recipient?.is_same_person &&
            (is_same_person || beneficiary_id))
            throw new common_1.BadRequestException('Invalid input for recipient same person');
        const data = {};
        const includeArgs = {
            created_by: true,
            beneficiary: {
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
            },
            recipient: {
                select: {
                    recipient_id: true,
                    first_name: true,
                    last_name: true,
                    business_name: true,
                    email: true,
                    phone_no: true,
                    is_same_person: true,
                    relationship: true,
                    is_send_email: true,
                    address_line_1: true,
                    address_line_2: true,
                    zip_code: true,
                    country: true,
                    state: { select: { state_id: true, state_name: true } },
                    city: { select: { city_id: true, city_name: true } },
                    bank_account: {
                        select: {
                            account_id: true,
                            account_no: true,
                            account_holder: true,
                            account_type: true,
                            bank_name: true,
                            branch_address: true,
                            bank_code_type: true,
                            branch_code: true,
                            bsb_code: true,
                            iban_no: true,
                            routing_code: true,
                            swift_code: true,
                        },
                    },
                    id_number: true,
                    id_type: true,
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
            },
            transfer_time: true,
            source_country: {
                select: {
                    country_id: true,
                    country_name: true,
                    iso2: true,
                    currency: true,
                    emojiU: true,
                    phone_code: true,
                },
            },
            destination_country: {
                select: {
                    country_id: true,
                    country_name: true,
                    iso2: true,
                    currency: true,
                    emojiU: true,
                    phone_code: true,
                },
            },
            invoice: {
                select: { mime: true, file_name: true, attachment_id: true },
            },
            reconciliation_report: {
                select: { mime: true, file_name: true, attachment_id: true },
            },
        };
        if (recipient_id) {
            const recipient = await this.prisma.recipient.findUnique({
                where: {
                    recipient_id,
                },
                include: { bank_account: true },
            });
            if (!recipient)
                throw new common_1.NotFoundException('Recipient  not found ');
            if (!recipient.bank_account)
                throw new common_1.NotFoundException('Recipient bank account not found ');
            data.recipient = { connect: { recipient_id } };
            data.status = utils_1.TransactionStatus.RECIPIENT_PICKED;
            data.recipient_account_type = recipient.recipient_account_type;
        }
        if (beneficiary_id) {
            const beneficiary = await this.prisma.beneficiary.findUnique({
                where: { beneficiary_id: beneficiary_id },
            });
            if (!beneficiary)
                throw new common_1.NotFoundException('Beneficiary not found ');
            data.status = utils_1.TransactionStatus.BENEFICIARY_PICKED;
            data.beneficiary = { connect: { beneficiary_id } };
        }
        if (is_same_person) {
            if (!transaction.recipient_id)
                throw new common_1.NotFoundException('Recipient not found');
            if (transaction.beneficiary_id) {
                data.beneficiary = {
                    disconnect: { beneficiary_id: transaction.beneficiary_id },
                };
            }
            data.recipient = {
                update: {
                    is_same_person: true,
                    relationship: recipient_relationship,
                },
            };
            data.recipient_relationship = recipient_relationship;
            data.status = utils_1.TransactionStatus.BENEFICIARY_PICKED;
        }
        if (transaction.recipient_id) {
            if (source_country_id) {
                const sourceCountry = await this.prisma.country.findUnique({
                    where: { country_id: source_country_id, is_active: true },
                });
                if (!sourceCountry)
                    throw new common_1.BadRequestException('"source_country_code" is not valid');
                data.source_country = {
                    connect: { country_id: sourceCountry.country_id },
                };
            }
            if (destination_country_id) {
                const destinationCountry = await this.prisma.country.findUnique({
                    where: { country_id: destination_country_id, is_active: true },
                });
                if (!destinationCountry)
                    throw new common_1.BadRequestException('"destination_country_code" is not valid');
                data.destination_country = {
                    connect: { country_id: destinationCountry.country_id },
                };
            }
            if (transfer_time_id) {
                const transfer_time = await this.prisma.transferTime.findUnique({
                    where: { transfer_time_id },
                });
                if (!transfer_time) {
                    throw new common_1.NotFoundException('transfer_time not found');
                }
                data.transfer_time = {
                    connect: { transfer_time_id: transfer_time.transfer_time_id },
                };
                const markUp = (transfer_time.mark_up_rate / 100) * parseFloat(exchange_amount);
                data.other_fee = transfer_time.other_fees;
                data.markup_fee = parseFloat(markUp.toFixed(2));
                data.final_amount =
                    data.other_fee + data.markup_fee + parseFloat(exchange_amount);
                if (transfer_time.fx_rate_network === 'Master_card') {
                    if (visa_quote_id) {
                        throw new common_1.BadRequestException('visa_quote_id should be empty');
                    }
                    data.visa_quote_id = null;
                }
                else {
                    if (!visa_quote_id) {
                        throw new common_1.BadRequestException('visa_quote_id should not be empty');
                    }
                    data.master_card_proposal_id = null;
                    data.master_card_transaction_id = null;
                }
            }
            data.exchange_amount = parseFloat(exchange_amount);
            data.destination_amount = parseFloat(destination_amount);
            if (purpose) {
                const individualPurposes = [
                    utils_1.TransactionPurpose.TUITION_FEE,
                    utils_1.TransactionPurpose.RENT,
                    utils_1.TransactionPurpose.INSURANCE,
                    utils_1.TransactionPurpose.LIVING_EXPENSE,
                    utils_1.TransactionPurpose.RETAIL,
                    utils_1.TransactionPurpose.TRAVEL,
                    utils_1.TransactionPurpose.HOSPITAL,
                    utils_1.TransactionPurpose.OTHERS,
                ];
                const businessPurposes = [
                    utils_1.TransactionPurpose.PAYROLL_AND_PENSION,
                    utils_1.TransactionPurpose.RENT,
                    utils_1.TransactionPurpose.IMPORT_AND_EXPORT,
                    utils_1.TransactionPurpose.INSURANCE,
                    utils_1.TransactionPurpose.LEGAL_FEES,
                    utils_1.TransactionPurpose.GOODS_PURCHASE,
                    utils_1.TransactionPurpose.OTHERS,
                ];
                if ((transaction.recipient.recipient_account_type ===
                    utils_1.AccountType.INDIVIDUAL &&
                    !individualPurposes.includes(purpose)) ||
                    (transaction.recipient.recipient_account_type ===
                        utils_1.AccountType.BUSINESS &&
                        !businessPurposes.includes(purpose))) {
                    throw new common_1.BadRequestException(`Invalid purpose for ${transaction.recipient.recipient_account_type} type`);
                }
                data.purpose = purpose;
            }
            data.reason = reason;
        }
        let updated_transaction;
        updated_transaction = await this.prisma.transaction.update({
            where: { transaction_id },
            data,
            include: includeArgs,
        });
        const updateData = {};
        if (transfer_time_id) {
            const currentDate = new Date();
            const futureDate = new Date();
            if (updated_transaction.transfer_time.fx_rate_network === 'Master_card') {
                const master_card_quote = await (0, helper_1.masterCardQuote)(transaction_id);
                updateData.master_card_transaction_id =
                    master_card_quote.quote.transaction_reference;
                updateData.master_card_proposal_id =
                    master_card_quote.quote.proposals.proposal[0].id;
                futureDate.setMinutes(currentDate.getMinutes() +
                    updated_transaction.transfer_time.duration_time);
                updateData.expiration_time = futureDate;
                console.log(master_card_quote.quote.proposals.proposal[0].id, '<<<<<<<< proposal id', transaction_id, '<<<<<<< transaction_id');
            }
            else {
                if (!visa_quote_id) {
                    throw new common_1.BadRequestException('visa_quote_id should not be empty');
                }
                updateData.visa_quote_id = visa_quote_id;
                futureDate.setMinutes(currentDate.getMinutes() +
                    updated_transaction.transfer_time.duration_time);
                updateData.expiration_time = futureDate;
            }
            updated_transaction = await this.prisma.transaction.update({
                where: { transaction_id },
                data: updateData,
                include: includeArgs,
            });
        }
        if (updated_transaction?.invoice.length) {
            updated_transaction.invoice = updated_transaction.invoice.map(({ attachment_id, file_name, mime }) => ({
                mime,
                attachment_id,
                url: this.azure.generateSASUrl(file_name, 'invoice'),
                file_name,
            }));
        }
        if (updated_transaction?.recipient?.kyc_attachments?.length) {
            updated_transaction.recipient.kyc_attachments =
                updated_transaction.recipient.kyc_attachments.map(({ attachment_id, file_name, mime }) => ({
                    mime,
                    attachment_id,
                    url: this.azure.generateSASUrl(file_name, 'recipient-kyc'),
                    file_name,
                }));
        }
        if (updated_transaction?.reconciliation_report) {
            const { attachment_id, file_name, mime } = updated_transaction.reconciliation_report;
            updated_transaction.reconciliation_report = {
                mime,
                attachment_id,
                url: this.azure.generateSASUrl(file_name, 'reconciliation-report'),
                file_name,
            };
        }
        delete updated_transaction?.status;
        return updated_transaction;
    }
    async cancelTransaction(transaction_id, { user_id }) {
        const transaction = await this.prisma.transaction.findUnique({
            where: { transaction_id, created_by: { user_id }, is_checkout: false },
        });
        if (!transaction) {
            throw new common_1.NotFoundException('Transaction not found');
        }
        const updated_transaction = await this.prisma.transaction.update({
            where: { transaction_id },
            data: {
                is_checkout: true,
            },
            include: {
                created_by: true,
                beneficiary: {
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
                },
                recipient: {
                    select: {
                        recipient_id: true,
                        first_name: true,
                        last_name: true,
                        business_name: true,
                        email: true,
                        phone_no: true,
                        is_same_person: true,
                        relationship: true,
                        is_send_email: true,
                        address_line_1: true,
                        address_line_2: true,
                        zip_code: true,
                        country: true,
                        state: { select: { state_id: true, state_name: true } },
                        city: { select: { city_id: true, city_name: true } },
                        bank_account: {
                            select: {
                                account_id: true,
                                account_no: true,
                                account_holder: true,
                                account_type: true,
                                bank_name: true,
                                branch_address: true,
                                bank_code_type: true,
                                branch_code: true,
                                bsb_code: true,
                                iban_no: true,
                                routing_code: true,
                                swift_code: true,
                            },
                        },
                        id_number: true,
                        id_type: true,
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
                },
                transfer_time: true,
                source_country: {
                    select: {
                        country_id: true,
                        country_name: true,
                        iso2: true,
                        currency: true,
                        emojiU: true,
                        phone_code: true,
                    },
                },
                destination_country: {
                    select: {
                        country_id: true,
                        country_name: true,
                        iso2: true,
                        currency: true,
                        emojiU: true,
                        phone_code: true,
                    },
                },
                invoice: {
                    select: { mime: true, file_name: true, attachment_id: true },
                },
                reconciliation_report: {
                    select: { mime: true, file_name: true, attachment_id: true },
                },
            },
        });
        if (updated_transaction?.invoice.length) {
            updated_transaction.invoice = updated_transaction.invoice.map(({ attachment_id, file_name, mime }) => ({
                mime,
                attachment_id,
                url: this.azure.generateSASUrl(file_name, 'invoice'),
                file_name,
            }));
        }
        if (updated_transaction?.reconciliation_report) {
            const { attachment_id, file_name, mime } = updated_transaction.reconciliation_report;
            updated_transaction.reconciliation_report = {
                mime,
                attachment_id,
                url: this.azure.generateSASUrl(file_name, 'reconciliation-report'),
                file_name,
            };
        }
        return updated_transaction;
    }
};
exports.TransactionService = TransactionService;
exports.TransactionService = TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        helper_1.AzureHelper])
], TransactionService);
//# sourceMappingURL=transaction.service.js.map
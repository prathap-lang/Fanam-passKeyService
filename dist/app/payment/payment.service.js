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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
const helper_1 = require("../../helper");
const logger_service_1 = require("../../logger.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const razorpay_service_1 = require("../../razorpay/razorpay.service");
const common_const_1 = require("../../utils/common.const");
let PaymentService = class PaymentService {
    constructor(prisma, log, razorpayService) {
        this.prisma = prisma;
        this.log = log;
        this.razorpayService = razorpayService;
    }
    create() {
        return 'This action adds a new payment';
    }
    async fxRateConversion(input) {
        const [visa, master_card, sourceCountry, destinationCountry] = await Promise.all([
            (0, helper_1.visaFxRateConversion)(input),
            (0, helper_1.masterCardCurrencyConvertor)(input),
            this.prisma.country.findUnique({
                where: { iso2: input.source_country_code, is_active: true },
            }),
            this.prisma.country.findUnique({
                where: {
                    iso2: input.destination_country_code,
                    is_active: true,
                },
            }),
        ]);
        if (!visa || !master_card) {
            throw new common_1.BadRequestException('something went wrong with visa or master_card response');
        }
        if (!sourceCountry) {
            throw new common_1.NotFoundException('source country not found');
        }
        if (!destinationCountry) {
            throw new common_1.NotFoundException('destination country not found');
        }
        const transferTimes = await this.prisma.transferTime.findMany({
            where: { country: { country_id: destinationCountry.country_id } },
        });
        if (!transferTimes.length) {
            throw new common_1.NotFoundException('transfer times not found');
        }
        const visaSourceAmount = parseFloat(visa.source_amount);
        const VisaDestinationAmount = parseFloat(visa.destination_amount);
        const masterCardSourceAmount = parseFloat(master_card.source_amount);
        const masterCardDestinationAmount = parseFloat(master_card.destination_amount);
        const transfer_times = [];
        transferTimes.forEach((transfer_time) => {
            if (transfer_time.transfer_network === 'Visa') {
                const markUpFees = (transfer_time.mark_up_rate / 100) * visaSourceAmount;
                transfer_times.push({
                    transfer_time_id: transfer_time.transfer_time_id,
                    fx_rate_network: transfer_time.fx_rate_network,
                    transfer_network: transfer_time.transfer_network,
                    sla_timing_min: transfer_time.sla_timing_min,
                    sla_timing_max: transfer_time.sla_timing_max,
                    exchange_rate: visaSourceAmount.toFixed(2),
                    destination_amount: VisaDestinationAmount.toFixed(2),
                    conversion_rate: visa.conversion_rate,
                    markup_fee: markUpFees.toFixed(2),
                    other_fees: transfer_time.other_fees.toFixed(2),
                    final_rate: (visaSourceAmount +
                        markUpFees +
                        transfer_time.other_fees).toFixed(2),
                    is_recommended: transfer_time.is_recommended,
                    is_exclude_other_fees: transfer_time.is_exclude_other_fees,
                    quote_id: visa.quote_id,
                });
            }
            else if (transfer_time.transfer_network === 'Master_card') {
                const markUp = (transfer_time.mark_up_rate / 100) * masterCardSourceAmount;
                transfer_times.push({
                    transfer_time_id: transfer_time.transfer_time_id,
                    fx_rate_network: transfer_time.fx_rate_network,
                    transfer_network: transfer_time.transfer_network,
                    sla_timing_min: transfer_time.sla_timing_min,
                    sla_timing_max: transfer_time.sla_timing_max,
                    exchange_rate: masterCardSourceAmount.toFixed(2),
                    destination_amount: masterCardDestinationAmount.toFixed(2),
                    conversion_rate: master_card.conversion_rate,
                    markup_fee: markUp.toFixed(2),
                    other_fees: transfer_time.other_fees.toFixed(2),
                    final_rate: (masterCardSourceAmount +
                        markUp +
                        transfer_time.other_fees).toFixed(2),
                    is_recommended: transfer_time.is_recommended,
                    is_exclude_other_fees: transfer_time.is_exclude_other_fees,
                });
            }
        });
        transfer_times.sort((a, b) => parseFloat(a.final_rate) - parseFloat(b.final_rate));
        if (transfer_times.length) {
            transfer_times[0].is_recommended = true;
        }
        this.log.logData({ 'transfer time >>>': transfer_times });
        return {
            sourceCountry,
            destinationCountry,
            transfer_times,
        };
    }
    findAll() {
        return `This action returns all payment`;
    }
    findOne(id) {
        return `This action returns a #${id} payment`;
    }
    update(id) {
        return `This action updates a #${id} payment`;
    }
    remove(id) {
        return `This action removes a #${id} payment`;
    }
    async cancelPayoutMasterCard(order_id, cancel_reason) {
        const order_data = await this.prisma.order.findUnique({
            where: { order_id },
            select: {
                payout_id: true,
                order_id: true,
                transaction_id: true,
            },
        });
        if (!order_data) {
            console.log({
                error: 'Order not found',
                timestamp: new Date(),
            });
            throw new common_1.NotFoundException('Order not found');
        }
        const payload = {
            cancelpaymentrequest: '',
        };
        const signingKey = await (0, helper_1.signInProvider)('../../src/helper/secret/master-card/fanam-sandbox-signing.p12');
        const encryptionPath = '../../src/helper/secret/master-card/mastercard-cross-border-services-ClientEnc1726060528257.pem';
        const decryptionPrivateKeyPath = '../../src/helper/secret/master-card/enckey.der';
        const config = await (0, helper_1.getEncryptionConfig)(encryptionPath, decryptionPrivateKeyPath);
        console.log({ 'mastercard cancel payload >>>': payload });
        const data = await (0, helper_1.encryptPayload)(payload, config);
        const payment_id = order_data.payout_id;
        const url = `${process.env.MASTER_CARD_BASE_URL}/send/v1/partners/BEL_MASEND5ged2/crossborder/${payment_id}/cancel`;
        console.log(order_data, '<<<<<<<<< order', url, '<<<<<<<<<<<<< url', data, '<<<<<<<<<<<enc data');
        const authHeader = await (0, helper_1.authorizationHeader)(url, common_const_1.POST, data, process.env.MASTER_CARD_PAYOUT_CONSUMER_KEY, signingKey);
        try {
            const response = await axios_1.default.post(url, data, {
                headers: {
                    Authorization: authHeader,
                    'Content-Type': 'application/json',
                    'Content-Length': data.length,
                    'x-encrypted': true,
                },
            });
            if (response) {
                console.log(response, '<<<<<<<<<<<, ');
            }
            if (response?.data) {
                const decrypt_data = await (0, helper_1.decryptResponse)(response.data, config);
                if (decrypt_data?.cancelpayment?.status) {
                    console.log(decrypt_data?.cancelpayment?.status, '<<<<<<<< cancel status');
                    const result = await this.razorpayService.automaticCreateRefund(order_id);
                    if (result) {
                        console.log(result, '<<<<<<<<<<<< result exist in cancel payout');
                        if (cancel_reason) {
                            await this.prisma.order.update({
                                where: { order_id: order_id },
                                data: {
                                    cancel_reason,
                                },
                            });
                        }
                        const result_data = await this.prisma.order.findUnique({
                            where: { order_id: order_id },
                            select: {
                                transaction: {
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
                                                email: true,
                                                phone_no: true,
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
                                            },
                                        },
                                        invoice: {
                                            select: {
                                                mime: true,
                                                file_name: true,
                                                attachment_id: true,
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
                                                initiating_party_id: true,
                                                fx_conversion_rate: true,
                                                payment_status: true,
                                                cancel_reason: true,
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
                                    },
                                },
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
                        });
                        return result_data;
                    }
                }
            }
            else {
                throw new common_1.BadRequestException('payment cancel went wrong');
            }
        }
        catch (error) {
            console.log({
                error: error?.response?.data?.Errors?.Error,
                timestamp: new Date(),
            });
            throw new common_1.BadRequestException(error?.response?.data?.Errors?.Error ||
                error?.response ||
                'something went wrong');
        }
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        logger_service_1.LoggerService,
        razorpay_service_1.RazorpayService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map
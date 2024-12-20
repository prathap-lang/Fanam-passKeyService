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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const helper_1 = require("../../../helper");
const logger_service_1 = require("../../../logger.service");
const prisma_service_1 = require("../../../prisma/prisma.service");
let PaymentService = class PaymentService {
    constructor(prisma, log) {
        this.prisma = prisma;
        this.log = log;
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
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        logger_service_1.LoggerService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map
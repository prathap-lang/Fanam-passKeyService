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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const helper_1 = require("../../../helper");
const session_interceptor_1 = require("../../../interceptors/session.interceptor");
const logger_service_1 = require("../../../logger.service");
const prisma_service_1 = require("../../../prisma/prisma.service");
const utils_1 = require("../../../utils");
const visa_fx_rate_dto_1 = require("./dto/visa-fx-rate.dto");
const payment_entity_1 = require("./payment.entity");
const payment_service_1 = require("./payment.service");
let PaymentController = class PaymentController {
    constructor(paymentService, prisma, log) {
        this.paymentService = paymentService;
        this.prisma = prisma;
        this.log = log;
    }
    async fxRateConversion(body) {
        this.log.logData({ 'currency convert >>>': body });
        const result = await this.paymentService.fxRateConversion(body);
        return new utils_1.AppResponse(result, 'Converted Currency Successfully');
    }
    async visaFxRatePopularCorridors() {
        const result = await (0, helper_1.visaFxRatePopularCorridors)();
        return new utils_1.AppResponse(result, 'Popular corridors fetched Successfully');
    }
    async sendPayout(transaction_id) {
        this.log.logData({ 'send payout >>>': transaction_id });
        const transaction = await this.prisma.transaction.findUnique({
            where: {
                transaction_id,
            },
            include: { transfer_time: true },
        });
        if (!transaction) {
            this.log.logData({
                error: 'Transaction not found',
                timestamp: new Date(),
            });
            throw new common_1.NotFoundException('Transaction not found');
        }
        if (!transaction.transfer_time_id) {
            this.log.logData({
                error: 'Transfer time not found',
                timestamp: new Date(),
            });
            throw new common_1.NotFoundException('Transfer time not found');
        }
        let result;
        if (transaction.master_card_proposal_id) {
            result = await (0, helper_1.masterCardQuoteConfirmation)(transaction_id);
        }
        else if (transaction.visa_quote_id) {
            this.log.logData({
                error: 'invalid payment',
                timestamp: new Date(),
            });
            throw new common_1.BadRequestException('INVALID PAYMENT');
        }
        this.log.logData({ 'send payout result >>>': result });
        return new utils_1.AppResponse(result, 'Payment initiated Successfully');
    }
    async cancelPayout(body) {
        this.log.logData({ 'cancelPayout >>>': body });
        const order_id = { body };
        const result = await (0, helper_1.cancelPayoutMasterCard)(order_id);
        console.log(result, 'result');
    }
};
exports.PaymentController = PaymentController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Convert currency' }),
    (0, swagger_1.ApiOkResponse)({ type: payment_entity_1.GetResFxRate }),
    (0, common_1.Post)('fxRate-conversion'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [visa_fx_rate_dto_1.VisaFxDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "fxRateConversion", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Convert currency' }),
    (0, swagger_1.ApiOkResponse)({ type: payment_entity_1.GetResFxRate }),
    (0, common_1.Get)('popularCorridors-visa'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "visaFxRatePopularCorridors", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'send payout' }),
    (0, common_1.Put)('send-payout/:transaction_id'),
    __param(0, (0, common_1.Param)('transaction_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "sendPayout", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Cancel Payout Master Card' }),
    (0, common_1.Post)('cancelPayout'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "cancelPayout", null);
exports.PaymentController = PaymentController = __decorate([
    (0, common_1.Controller)('payment'),
    (0, swagger_1.ApiTags)('Payment'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBadRequestResponse)({
        type: utils_1.EntityErrorResponse,
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(session_interceptor_1.SessionInterceptor),
    __metadata("design:paramtypes", [payment_service_1.PaymentService,
        prisma_service_1.PrismaService,
        logger_service_1.LoggerService])
], PaymentController);
//# sourceMappingURL=payment.controller.js.map
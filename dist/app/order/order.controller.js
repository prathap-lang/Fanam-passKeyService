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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const transaction_entity_1 = require("../transaction/transaction.entity");
const user_entity_1 = require("../user/user.entity");
const decorators_1 = require("../../decorators");
const session_interceptor_1 = require("../../interceptors/session.interceptor");
const logger_service_1 = require("../../logger.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const utils_1 = require("../../utils");
const razorpay_service_1 = require("../../razorpay/razorpay.service");
const dto_1 = require("./dto");
const order_service_1 = require("./order.service");
let OrderController = class OrderController {
    constructor(OrderService, prisma, razorpayService, log) {
        this.OrderService = OrderService;
        this.prisma = prisma;
        this.razorpayService = razorpayService;
        this.log = log;
    }
    async createOrder(createOrder, user) {
        this.log.logData({ 'order create >>>': createOrder });
        const result = await this.OrderService.createOrder(createOrder, user);
        return new utils_1.AppResponse(result, 'Request Processed Successfully');
    }
    async findOne(order_id) {
        this.log.logData({ 'order findone >>>': order_id });
        const result = await this.OrderService.findOne(order_id);
        return new utils_1.AppResponse(result, 'Fetched Order Detail Successfully');
    }
    async webhook(req) {
        console.log(JSON.stringify(req.body.payload), '<<<<<<<<<< Payload >>>>>>>>>>>>');
        try {
            this.log.logData({ 'paymentWebhook >>>': req.body });
            if (req.body && req.body.payload && !req.body.payload.payment) {
                this.log.logData({ 'payment unknown >>>': req.body });
                return;
            }
            const data = {
                id: req.body.payload.payment.entity.order_id,
                amount: req.body.payload.payment.entity.amount / 100,
                event: req.body.event,
                paymentId: req.body.payload.payment.entity.id,
                paymentMethod: req.body.payload.payment.entity.method,
            };
            await this.OrderService.createwebhookrazor(data);
        }
        catch (error) {
            console.log('error>>>', error);
            return { statuscode: 200, message: 'success' };
        }
        return { statuscode: 200, message: 'success' };
    }
    async crossborderwebhook(req) {
        console.log(JSON.stringify(req.body), '<<<<<<<<<< Payload >>>>>>>>>>>>');
        try {
            const orderpayment = req.body;
            this.log.logData({ 'visaWebhook >>>': req.body });
            const data = {
                payoutId: orderpayment.transactionDetail.payoutId,
                status: orderpayment.transactionDetail.status,
            };
            await this.OrderService.visaWebhook(data);
        }
        catch (error) {
            console.log('error>>>', error);
            return { statuscode: 200, message: 'success' };
        }
        return { statuscode: 200, message: 'success' };
    }
    async mastercardwebhook(req) {
        console.log(JSON.stringify(req.body), '<<<<<<<<<< Payload >>>>>>>>>>>>');
        try {
            const data = req.body;
            this.log.logData({ 'masterCardWebhook >>>': req.body });
            await this.OrderService.masterCardWebhook(data);
        }
        catch (error) {
            console.log('error>>>', error);
            return { statuscode: 200, message: 'success' };
        }
        return { statuscode: 200, message: 'success' };
    }
    async createRefund(transaction_id, user) {
        this.log.logData({ 'create_refund >>>': transaction_id });
        const result = await this.razorpayService.createRefund(transaction_id, user);
        return new utils_1.AppResponse(result, 'Refund initiated successfully');
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Order' }),
    (0, swagger_1.ApiOkResponse)({ type: transaction_entity_1.EntityGetTransaction }),
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(session_interceptor_1.SessionInterceptor),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateOrderDto,
        user_entity_1.BaseResUser]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createOrder", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get Order by id' }),
    (0, swagger_1.ApiOkResponse)({ type: transaction_entity_1.EntityGetTransaction }),
    (0, common_1.Get)(':order_id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(session_interceptor_1.SessionInterceptor),
    __param(0, (0, common_1.Param)('order_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findOne", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('razor-webhook'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "webhook", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('visa-webhook'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "crossborderwebhook", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('masterCard-webhook'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "mastercardwebhook", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'create_refund' }),
    (0, swagger_1.ApiOkResponse)({ type: transaction_entity_1.EntityGetTransaction }),
    (0, common_1.Get)('create_refund/:transaction_id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(session_interceptor_1.SessionInterceptor),
    __param(0, (0, common_1.Param)('transaction_id')),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.BaseResUser]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createRefund", null);
exports.OrderController = OrderController = __decorate([
    (0, common_1.Controller)('order'),
    (0, swagger_1.ApiTags)('order'),
    (0, swagger_1.ApiBadRequestResponse)({ type: utils_1.EntityErrorResponse }),
    __metadata("design:paramtypes", [order_service_1.OrderService,
        prisma_service_1.PrismaService,
        razorpay_service_1.RazorpayService,
        logger_service_1.LoggerService])
], OrderController);
//# sourceMappingURL=order.controller.js.map
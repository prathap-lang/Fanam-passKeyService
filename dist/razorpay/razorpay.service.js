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
exports.RazorpayService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const razorpay_1 = __importDefault(require("razorpay"));
const utils_1 = require("../utils");
const uuidv4_1 = require("uuidv4");
let RazorpayService = class RazorpayService {
    constructor(prisma) {
        this.prisma = prisma;
        this.razorpay = new razorpay_1.default({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
    }
    async createPayment(amount) {
        const options = { amount: amount * 100, currency: 'INR', receipt: (0, uuidv4_1.uuid)() };
        return this.razorpay.orders.create(options);
    }
    async capturePayment(paymentId, amount, currency = 'INR') {
        return this.razorpay.payments.capture(paymentId, amount * 100, currency);
    }
    async createRazorpayOrder(amount) {
        const totalAmount = Math.floor(amount * 100);
        const orderDetails = {
            amount: totalAmount,
            currency: 'INR',
            receipt: (0, uuidv4_1.uuid)(),
        };
        const razorpayOrder = await this.razorpay.orders.create(orderDetails);
        return razorpayOrder;
    }
    async createRefund(transaction_id, user) {
        const [order, transaction] = await this.prisma.$transaction([
            this.prisma.order.findUnique({
                where: { transaction_id },
                include: { payment: true },
            }),
            this.prisma.transaction.findUnique({
                where: {
                    transaction_id,
                },
                include: {
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
                            payout_speed: true,
                        },
                    },
                },
            }),
        ]);
        console.log('Order>>>', JSON.stringify(order));
        if (!order) {
            throw new common_1.NotFoundException(`Refund initiation failed`);
        }
        if (!order.payment) {
            await this.prisma.order.update({
                where: { order_id: order.order_id },
                data: {
                    order_status: utils_1.OrderStatus.PAYMENT_REJECTED,
                    logs: { create: { status: utils_1.OrderStatus.PAYMENT_REJECTED } },
                },
            });
            return 'Refund Successful';
        }
        if (order.payment_status === utils_1.OrderStatus.PAYMENT_IN_TRANSITION) {
            const refund = await this.razorpay.payments.refund(order.payment.razorpay_payment_id, {});
            if (refund && refund.id) {
                await this.prisma.order.update({
                    where: { order_id: order.order_id },
                    data: {
                        order_status: utils_1.OrderStatus.REFUND_INITIATED,
                        logs: {
                            create: {
                                status: utils_1.OrderStatus.REFUND_INITIATED,
                                updatedBy: { connect: { user_id: user.user_id } },
                            },
                        },
                    },
                });
            }
            return transaction;
        }
        return transaction;
    }
    async automaticCreateRefund(order_id) {
        const [order, transaction] = await this.prisma.$transaction([
            this.prisma.order.findUnique({
                where: { order_id },
                include: { payment: true },
            }),
            this.prisma.transaction.findFirst({
                where: {
                    order: { order_id },
                },
                include: {
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
                            payout_speed: true,
                        },
                    },
                },
            }),
        ]);
        console.log('Order>>>', JSON.stringify(order));
        if (!order) {
            throw new common_1.NotFoundException(`Refund initiation failed`);
        }
        if (!order.payment) {
            await this.prisma.order.update({
                where: { order_id },
                data: {
                    order_status: utils_1.OrderStatus.PAYMENT_REJECTED,
                    payment_status: utils_1.OrderStatus.PAYMENT_REJECTED,
                    logs: { create: { status: utils_1.OrderStatus.PAYMENT_REJECTED } },
                },
            });
            return 'Refund Successful';
        }
        if (order.payment_status === utils_1.OrderStatus.PAYMENT_IN_TRANSITION) {
            let refund;
            try {
                refund = await this.razorpay.payments.refund(order.payment.razorpay_payment_id, {});
                console.log(refund, 'refund');
            }
            catch (error) {
                console.log(error, 'error');
                throw new common_1.NotFoundException(`Refund initiation failed`);
            }
            if (refund && refund.id) {
                await this.prisma.order.update({
                    where: { order_id },
                    data: {
                        order_status: utils_1.OrderStatus.REFUND_INITIATED,
                        payment_status: utils_1.OrderStatus.REFUND_INITIATED,
                        payment: {
                            update: {
                                status: utils_1.OrderStatus.REFUND_INITIATED,
                            },
                        },
                        logs: {
                            create: {
                                status: utils_1.OrderStatus.REFUND_INITIATED,
                            },
                        },
                    },
                });
            }
            return transaction;
        }
        else {
            throw new common_1.NotFoundException(`Refund initiation failed`);
        }
    }
};
exports.RazorpayService = RazorpayService;
exports.RazorpayService = RazorpayService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RazorpayService);
//# sourceMappingURL=razorpay.service.js.map
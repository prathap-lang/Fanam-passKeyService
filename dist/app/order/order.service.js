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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const helper_1 = require("../../helper");
const common_helper_1 = require("../../helper/common.helper");
const logger_service_1 = require("../../logger.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const razorpay_service_1 = require("../../razorpay/razorpay.service");
const email_service_1 = require("../../email/email.service");
const pdf_service_1 = require("../../pdf/pdf.service");
const common_enum_1 = require("../../utils/common.enum");
let OrderService = class OrderService {
    constructor(prisma, razorPayService, azure, log, pdf, email) {
        this.prisma = prisma;
        this.razorPayService = razorPayService;
        this.azure = azure;
        this.log = log;
        this.pdf = pdf;
        this.email = email;
    }
    async createOrder({ transaction_id }, { user_id }) {
        const transaction = await this.prisma.transaction.findUnique({
            where: { transaction_id: transaction_id, is_checkout: false },
            include: {
                source_country: true,
            },
        });
        if (!transaction) {
            this.log.logData({
                error: 'Transaction not found',
                timestamp: new Date(),
            });
            throw new common_1.NotFoundException('Transaction not found');
        }
        const current_date_time = new Date().getTime();
        const expiration_time = transaction.expiration_time.getTime();
        if (expiration_time <= current_date_time) {
            this.log.logData({
                error: 'Quote Expired!!!',
                timestamp: new Date(),
            });
            throw new common_1.BadRequestException('Quote Expired!!!');
        }
        const order_no = await this.getorderNo();
        if (!order_no) {
            this.log.logData({
                error: 'OrderNo not found',
                timestamp: new Date(),
            });
            throw new common_1.NotFoundException('OrderNo  not found');
        }
        if (!transaction.destination_amount)
            throw new common_1.NotFoundException('Amount  not found');
        const orderData = {
            amount: transaction.final_amount,
            order_status: common_enum_1.OrderStatus.PAYMENT_INITIATED,
            order_no,
            transaction: {
                connect: {
                    transaction_id: transaction_id,
                },
            },
            logs: {
                create: {
                    status: common_enum_1.OrderStatus.PAYMENT_INITIATED,
                    userId: user_id,
                },
            },
            user: { connect: { user_id } },
        };
        const razorpayOrder = await this.razorPayService.createRazorpayOrder(transaction.final_amount);
        if (razorpayOrder) {
            orderData.razorpay_order_id = razorpayOrder.id;
            orderData.payment_status =
                razorpayOrder?.status === 'created' ? 'Pending' : null;
        }
        const order = await this.prisma.order.create({
            data: orderData,
        });
        if (order) {
            const transaction = await this.prisma.transaction.update({
                where: {
                    transaction_id,
                },
                data: {
                    status: common_enum_1.OrderStatus.PAYMENT_INITIATED,
                    is_checkout: true,
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
            });
            if (order) {
                (0, common_helper_1.resetDelayedFunction)(this.prisma, this.razorPayService, order.order_id);
            }
            return transaction;
        }
    }
    async findOne(order_id) {
        const order = await this.prisma.order.findUnique({
            where: { order_id },
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
                                        bsb_code: true,
                                        iban_no: true,
                                        routing_code: true,
                                        swift_code: true,
                                    },
                                },
                            },
                        },
                        invoice: {
                            select: { mime: true, file_name: true, attachment_id: true },
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
            },
        });
        if (!order) {
            this.log.logData({
                error: 'Order not found',
                timestamp: new Date(),
            });
            throw new common_1.NotFoundException('Order not found');
        }
        if (order.transaction?.invoice?.length) {
            order.transaction.invoice = order.transaction.invoice.map(({ attachment_id, file_name, mime }) => ({
                mime,
                attachment_id,
                url: this.azure.generateSASUrl(file_name, 'invoice'),
                file_name,
            }));
        }
        return order.transaction;
    }
    async createwebhookrazor(data) {
        try {
            if (!data.id) {
                console.log('Razorpay Order Id not found');
                return;
            }
            const order = await this.prisma.order.findFirst({
                where: {
                    razorpay_order_id: data.id,
                },
            });
            if (!order) {
                this.log.logData({
                    error: 'Order not found',
                    timestamp: new Date(),
                });
                console.log('Order not found');
                return;
            }
            const updateData = {};
            let status;
            if (data.event === common_enum_1.RazorpayWebhookOrderStatus.WEBHOOK_ORDER_SUCCESS ||
                data.event === common_enum_1.RazorpayWebhookOrderStatus.WEBHOOK_ORDER_CAPTURED) {
                status = common_enum_1.OrderStatus.PAYMENT_IN_TRANSITION;
            }
            else if (data.event === common_enum_1.RazorpayWebhookOrderStatus.WEBHOOK_ORDER_FAILED) {
                status = common_enum_1.OrderStatus.TRANSACTION_FAILURE;
            }
            else if (data.event === common_enum_1.RazorpayWebhookOrderStatus.WEBHOOK_REFUND_CREATED) {
                status = common_enum_1.OrderStatus.REFUND_IN_PROGRESS;
            }
            else if (data.event === common_enum_1.RazorpayWebhookOrderStatus.WEBHOOK_REFUND_PROCESSED) {
                status = common_enum_1.OrderStatus.REFUND_SUCCESSFUL;
            }
            else if (data.event === common_enum_1.RazorpayWebhookOrderStatus.WEBHOOK_REFUND_FAILED) {
                status = common_enum_1.OrderStatus.REFUND_FAILED;
            }
            else {
                return;
            }
            updateData.order_status = status;
            updateData.payment_status = status;
            if (order.payment_id) {
                updateData.payment = {
                    update: {
                        amount: data.amount,
                        razorpay_payment_id: data.paymentId,
                        paymentMethod: data.paymentMethod,
                        status,
                    },
                };
            }
            else {
                updateData.payment = {
                    create: {
                        amount: data.amount,
                        razorpay_payment_id: data.paymentId,
                        paymentMethod: data.paymentMethod,
                        status,
                    },
                };
            }
            updateData.logs = {
                create: {
                    status,
                },
            };
            await this.prisma.order.update({
                where: { order_id: order.order_id },
                data: updateData,
            });
        }
        catch (err) {
            console.log(err, 'WEBHOOK-ERR>>>>>');
            return;
        }
        return;
    }
    async getorderNo() {
        const order = await this.prisma.order.findFirst({
            orderBy: {
                createdAt: 'desc',
            },
        });
        const date = new Date();
        const formattedDate = date.getFullYear() +
            ('0' + (date.getMonth() + 1)).slice(-2) +
            ('0' + date.getDate()).slice(-2);
        const lastThreeDigits = order ? order.order_no.slice(-3) : '000';
        console.log('lastThreeDigits', lastThreeDigits);
        const incrementedDigits = parseInt(lastThreeDigits) + 1;
        console.log('incrementedDigits', incrementedDigits);
        const incrementedDigitsStr = ('000' + incrementedDigits).slice(-3);
        const newOrderNo = `FAN` + formattedDate + incrementedDigitsStr;
        return newOrderNo;
    }
    async visaWebhook(value) {
        const order = await this.prisma.order.findFirst({
            where: { payout_id: value.payoutId },
            include: { transaction: { include: { recipient: true } } },
        });
        if (!order) {
            this.log.logData({
                error: 'Order not found',
                timestamp: new Date(),
            });
            console.log('Order not found');
            return;
        }
        const data = {};
        let status_data;
        if (value.status === common_enum_1.PaymentWebhookOrderStatus.WEBHOOK_ORDER_VISA_RECIVED) {
            status_data = common_enum_1.OrderStatus.TRANSACTION_SUCCESS;
            if (order.transaction.recipient.is_send_email) {
                await this.pdf.generateUserReport(order.transaction.transaction_id, 'visa');
            }
        }
        else if (value.status === common_enum_1.PaymentWebhookOrderStatus.WEBHOOK_ORDER_VISA_PENDING) {
            status_data = common_enum_1.OrderStatus.TRANSACTION_PENDING;
        }
        data.order_status = status_data;
        if (order.payment_id) {
            data.payment = {
                update: {
                    status: status_data,
                },
            };
        }
        data.logs = {
            create: {
                status: status_data,
            },
        };
        await this.prisma.order.update({
            where: { order_id: order.order_id },
            data,
        });
        return;
    }
    async masterCardWebhook(data) {
        if (!data) {
            console.log('MasterCard Webhook data not found');
            return;
        }
        const order = await this.prisma.order.findFirst({
            where: { proposal_id: data.proposalId },
            include: { transaction: { include: { recipient: true } } },
        });
        if (!order) {
            this.log.logData({
                error: 'Order not found',
                timestamp: new Date(),
            });
            console.log('Order not found');
        }
        const updateData = {};
        if (data.transactionStatus) {
            let status;
            switch (data.transactionStatus) {
                case common_enum_1.PaymentWebhookOrderStatus.WEBHOOK_ORDER_MC_SUCCESS:
                    status = common_enum_1.OrderStatus.TRANSACTION_SUCCESS;
                    break;
                case common_enum_1.PaymentWebhookOrderStatus.WEBHOOK_ORDER_MC_PENDING:
                    status = common_enum_1.OrderStatus.TRANSACTION_PENDING;
                    break;
                case common_enum_1.PaymentWebhookOrderStatus.WEBHOOK_ORDER_MC_CANCELLED:
                    status = common_enum_1.OrderStatus.TRANSACTION_CANCELED;
                    break;
                case common_enum_1.PaymentWebhookOrderStatus.WEBHOOK_ORDER_MC_REJECTED:
                    status = common_enum_1.OrderStatus.TRANSACTION_REJECTED;
                    break;
                case common_enum_1.PaymentWebhookOrderStatus.WEBHOOK_ORDER_MC_RETURNED:
                    status = common_enum_1.OrderStatus.TRANSACTION_RETURNED;
                    break;
            }
            updateData.order_status = status;
            if (order.payment_id) {
                updateData.payment = {
                    update: {
                        status,
                    },
                };
            }
            updateData.logs = {
                create: {
                    status,
                },
            };
            const updateOrder = await this.prisma.order.update({
                where: { order_id: order.order_id },
                data: updateData,
            });
            try {
                if (data.transactionStatus ===
                    common_enum_1.PaymentWebhookOrderStatus.WEBHOOK_ORDER_MC_SUCCESS &&
                    updateOrder) {
                    if (order.transaction.recipient.is_send_email) {
                        await this.pdf.generateUserReport(order.transaction.transaction_id, 'mastercard');
                    }
                }
            }
            catch (error) {
                this.log.logData({
                    error: `something happened wrong while Pdf-Report generation >>>>>>>>>:${error}`,
                    timestamp: new Date(),
                });
                console.log(error, '<<<<<<<<<<< something happened wrong while Pdf-Report generation');
            }
        }
        return;
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        razorpay_service_1.RazorpayService,
        helper_1.AzureHelper,
        logger_service_1.LoggerService,
        pdf_service_1.PdfService,
        email_service_1.EmailService])
], OrderService);
//# sourceMappingURL=order.service.js.map
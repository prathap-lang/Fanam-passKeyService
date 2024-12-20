"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const email_service_1 = require("../../email/email.service");
const helper_1 = require("../../helper");
const logger_service_1 = require("../../logger.service");
const pdf_service_1 = require("../../pdf/pdf.service");
const prisma_service_1 = require("../../prisma/prisma.service");
const razorpay_service_1 = require("../../razorpay/razorpay.service");
const payment_controller_1 = require("./payment.controller");
const payment_service_1 = require("./payment.service");
let PaymentModule = class PaymentModule {
};
exports.PaymentModule = PaymentModule;
exports.PaymentModule = PaymentModule = __decorate([
    (0, common_1.Module)({
        controllers: [payment_controller_1.PaymentController],
        providers: [
            payment_service_1.PaymentService,
            prisma_service_1.PrismaService,
            logger_service_1.LoggerService,
            razorpay_service_1.RazorpayService,
            pdf_service_1.PdfService,
            helper_1.AzureHelper,
            email_service_1.EmailService,
            config_1.ConfigService,
        ],
    })
], PaymentModule);
//# sourceMappingURL=payment.module.js.map
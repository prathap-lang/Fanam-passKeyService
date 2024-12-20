"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipientModule = void 0;
const common_1 = require("@nestjs/common");
const transaction_service_1 = require("../transaction/transaction.service");
const helper_1 = require("../../helper");
const prisma_service_1 = require("../../prisma/prisma.service");
const recipient_controller_1 = require("./recipient.controller");
const recipient_service_1 = require("./recipient.service");
let RecipientModule = class RecipientModule {
};
exports.RecipientModule = RecipientModule;
exports.RecipientModule = RecipientModule = __decorate([
    (0, common_1.Module)({
        controllers: [recipient_controller_1.RecipientController],
        providers: [recipient_service_1.RecipientService, prisma_service_1.PrismaService, transaction_service_1.TransactionService, helper_1.AzureHelper],
    })
], RecipientModule);
//# sourceMappingURL=recipient.module.js.map
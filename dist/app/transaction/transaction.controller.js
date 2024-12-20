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
exports.TransactionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const user_entity_1 = require("../user/user.entity");
const decorators_1 = require("../../decorators");
const session_interceptor_1 = require("../../interceptors/session.interceptor");
const prisma_service_1 = require("../../prisma/prisma.service");
const utils_1 = require("../../utils");
const create_transaction_dto_1 = require("./dto/create-transaction.dto");
const transaction_entity_1 = require("./transaction.entity");
const transaction_service_1 = require("./transaction.service");
let TransactionController = class TransactionController {
    constructor(transactionService, prisma) {
        this.transactionService = transactionService;
        this.prisma = prisma;
    }
    async create(body, user) {
        const result = await this.transactionService.create(body, user);
        return new utils_1.AppResponse(result, 'Created Transaction Successfully');
    }
    async findAll(start_date, end_date, status, user) {
        const result = await this.transactionService.findAll(user, start_date, end_date, status);
        return new utils_1.AppResponse(result, 'Fetched All Transactions Successfully');
    }
    async findOne(transaction_id, user) {
        const result = await this.transactionService.findOne(transaction_id, user);
        return new utils_1.AppResponse(result, 'Fetched Transactions Detail Successfully');
    }
    async update(transaction_id, body, user, req) {
        console.log(req.headers.authorization?.split(' ')[1], '<<<<<<<< token');
        const result = await this.transactionService.update(transaction_id, body, user);
        return new utils_1.AppResponse(result, 'Updated Transactions Detail Successfully');
    }
    async cancelTransaction(transaction_id, user) {
        const result = await this.transactionService.cancelTransaction(transaction_id, user);
        return new utils_1.AppResponse(result, 'Cancel Transactions Detail Successfully');
    }
};
exports.TransactionController = TransactionController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create Transaction' }),
    (0, swagger_1.ApiOkResponse)({ type: transaction_entity_1.EntityCreateTransaction }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_transaction_dto_1.CreateTransactionDto,
        user_entity_1.BaseResUser]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all Transaction' }),
    (0, swagger_1.ApiOkResponse)({ type: transaction_entity_1.EntityGetTransactionList }),
    (0, common_1.Get)(),
    (0, swagger_1.ApiQuery)({
        name: 'status',
        enum: utils_1.TransactionFilterOrderStatus,
        required: false,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'start_date',
        required: false,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'end_date',
        required: false,
    }),
    __param(0, (0, common_1.Query)('start_date')),
    __param(1, (0, common_1.Query)('end_date')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, user_entity_1.BaseResUser]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all Transaction' }),
    (0, swagger_1.ApiOkResponse)({ type: transaction_entity_1.EntityGetTransaction }),
    (0, common_1.Get)(':transaction_id'),
    __param(0, (0, common_1.Param)('transaction_id')),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.BaseResUser]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get Transaction by id' }),
    (0, swagger_1.ApiOkResponse)({ type: transaction_entity_1.EntityUpdateTransaction }),
    (0, common_1.Put)(':transaction_id'),
    __param(0, (0, common_1.Param)('transaction_id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_1.CurrentUser)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_transaction_dto_1.UpdateTransactionDto,
        user_entity_1.BaseResUser, Object]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Cancel Transaction' }),
    (0, swagger_1.ApiOkResponse)({ type: transaction_entity_1.EntityUpdateTransaction }),
    (0, common_1.Put)('cancel/:transaction_id'),
    __param(0, (0, common_1.Param)('transaction_id')),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.BaseResUser]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "cancelTransaction", null);
exports.TransactionController = TransactionController = __decorate([
    (0, common_1.Controller)('transaction'),
    (0, swagger_1.ApiTags)('Transaction'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBadRequestResponse)({
        type: utils_1.EntityErrorResponse,
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(session_interceptor_1.SessionInterceptor),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService,
        prisma_service_1.PrismaService])
], TransactionController);
//# sourceMappingURL=transaction.controller.js.map
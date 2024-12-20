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
exports.BankAccountController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const user_entity_1 = require("../user/user.entity");
const decorators_1 = require("../../decorators");
const session_interceptor_1 = require("../../interceptors/session.interceptor");
const utils_1 = require("../../utils");
const bank_account_entity_1 = require("./bank-account.entity");
const bank_account_service_1 = require("./bank-account.service");
const dto_1 = require("./dto");
let BankAccountController = class BankAccountController {
    constructor(bankService) {
        this.bankService = bankService;
    }
    async createRecipientBankAccount(createRecipientBankAccount, user) {
        const result = await this.bankService.createRecipientBankAccount(createRecipientBankAccount, user);
        return new utils_1.AppResponse(result, 'Created Recipient Bank-account Successfully');
    }
    async findAll() {
        const result = await this.bankService.findAll();
        return new utils_1.AppResponse(result, 'Fetch All Bank-accounts Successfully');
    }
    async recipientBankAccountDetail(account_id) {
        const result = await this.bankService.recipientBankAccountDetail(account_id);
        return new utils_1.AppResponse(result, 'Fetched Bank-account Successfully');
    }
    async update(account_id, updateBankDto) {
        await this.recipientBankAccountDetail(account_id);
        const result = await this.bankService.update(account_id, updateBankDto);
        return new utils_1.AppResponse(result, 'Updated Bank-account Successfully');
    }
};
exports.BankAccountController = BankAccountController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create Recipient Bank-account' }),
    (0, swagger_1.ApiOkResponse)({ type: bank_account_entity_1.EntityCreateBankAccount }),
    (0, common_1.Post)('recipient'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateRecipientBankAccount,
        user_entity_1.BaseResUser]),
    __metadata("design:returntype", Promise)
], BankAccountController.prototype, "createRecipientBankAccount", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all Bank-accounts' }),
    (0, swagger_1.ApiOkResponse)({ type: bank_account_entity_1.EntityGetBankAccountList }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BankAccountController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get recipient Bank-account' }),
    (0, swagger_1.ApiOkResponse)({ type: bank_account_entity_1.EntityGetBankAccount }),
    (0, common_1.Get)(':account_id/recipient'),
    __param(0, (0, common_1.Param)('account_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BankAccountController.prototype, "recipientBankAccountDetail", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update Bank-account' }),
    (0, swagger_1.ApiOkResponse)({ type: bank_account_entity_1.EntityUpdateBankAccount }),
    (0, common_1.Put)(':bank_account_id'),
    __param(0, (0, common_1.Param)('account_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateBankDto]),
    __metadata("design:returntype", Promise)
], BankAccountController.prototype, "update", null);
exports.BankAccountController = BankAccountController = __decorate([
    (0, common_1.Controller)('bank-account'),
    (0, swagger_1.ApiTags)('Bank-account'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBadRequestResponse)({ type: utils_1.EntityErrorResponse }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(session_interceptor_1.SessionInterceptor),
    __metadata("design:paramtypes", [bank_account_service_1.BankAccountService])
], BankAccountController);
//# sourceMappingURL=bank-account.controller.js.map
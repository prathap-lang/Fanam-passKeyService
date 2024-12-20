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
exports.RecipientController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const user_entity_1 = require("../user/user.entity");
const decorators_1 = require("../../decorators");
const session_interceptor_1 = require("../../interceptors/session.interceptor");
const utils_1 = require("../../utils");
const recipient_dto_1 = require("./dto/recipient.dto");
const recipient_entity_1 = require("./recipient.entity");
const recipient_service_1 = require("./recipient.service");
let RecipientController = class RecipientController {
    constructor(recipientService) {
        this.recipientService = recipientService;
    }
    async create(body, user) {
        const result = await this.recipientService.create(body, user);
        return new utils_1.AppResponse(result, 'Created Recipient Successfully');
    }
    async findAll(recipient_type, user) {
        const result = await this.recipientService.findAll(recipient_type, user);
        return new utils_1.AppResponse(result, 'Fetch All Recipients Successfully');
    }
    async findOne(recipient_id, user) {
        const result = await this.recipientService.findOne(recipient_id, user);
        return new utils_1.AppResponse(result, 'Fetched Recipient Detail Successfully');
    }
    async update(recipient_id, updateRecipientDto, user) {
        const result = await this.recipientService.update(recipient_id, updateRecipientDto, user);
        return new utils_1.AppResponse(result, 'Updated Recipient Detail Successfully');
    }
};
exports.RecipientController = RecipientController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create Recipient' }),
    (0, swagger_1.ApiOkResponse)({ type: recipient_entity_1.EntityCreateRecipient }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recipient_dto_1.CreateRecipientDto,
        user_entity_1.BaseResUser]),
    __metadata("design:returntype", Promise)
], RecipientController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all Recipient' }),
    (0, swagger_1.ApiOkResponse)({ type: recipient_entity_1.EntityGetRecipientList }),
    (0, common_1.Get)(),
    (0, swagger_1.ApiQuery)({
        name: 'recipient_type',
        enum: utils_1.AccountType,
        required: false,
    }),
    __param(0, (0, common_1.Query)('recipient_type')),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.BaseResUser]),
    __metadata("design:returntype", Promise)
], RecipientController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get Recipient by id' }),
    (0, swagger_1.ApiOkResponse)({ type: recipient_entity_1.EntityGetRecipient }),
    (0, common_1.Get)(':recipient_id'),
    __param(0, (0, common_1.Param)('recipient_id')),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.BaseResUser]),
    __metadata("design:returntype", Promise)
], RecipientController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update Recipient' }),
    (0, swagger_1.ApiOkResponse)({ type: recipient_entity_1.EntityUpdateRecipient }),
    (0, common_1.Put)(':recipient_id'),
    __param(0, (0, common_1.Param)('recipient_id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, recipient_dto_1.UpdateRecipientDto,
        user_entity_1.BaseResUser]),
    __metadata("design:returntype", Promise)
], RecipientController.prototype, "update", null);
exports.RecipientController = RecipientController = __decorate([
    (0, common_1.Controller)('recipient'),
    (0, swagger_1.ApiTags)('Recipient'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBadRequestResponse)({ type: utils_1.EntityErrorResponse }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(session_interceptor_1.SessionInterceptor),
    __metadata("design:paramtypes", [recipient_service_1.RecipientService])
], RecipientController);
//# sourceMappingURL=recipient.controller.js.map
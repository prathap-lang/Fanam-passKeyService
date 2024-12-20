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
exports.BeneficiaryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const user_entity_1 = require("../user/user.entity");
const decorators_1 = require("../../decorators");
const session_interceptor_1 = require("../../interceptors/session.interceptor");
const utils_1 = require("../../utils");
const beneficiary_entity_1 = require("./beneficiary.entity");
const beneficiary_service_1 = require("./beneficiary.service");
const dto_1 = require("./dto");
let BeneficiaryController = class BeneficiaryController {
    constructor(beneficiaryService) {
        this.beneficiaryService = beneficiaryService;
    }
    async create(body, user) {
        const result = await this.beneficiaryService.create(body, user);
        return new utils_1.AppResponse(result, 'Created Beneficiary Successfully');
    }
    async findAll(user) {
        const result = await this.beneficiaryService.findAll(user);
        return new utils_1.AppResponse(result, 'Fetch All Beneficiaries Successfully');
    }
    async findOne(beneficiary_id, user) {
        const result = await this.beneficiaryService.findOne(beneficiary_id, user);
        return new utils_1.AppResponse(result, 'Fetched Beneficiary Detail Successfully');
    }
    async update(beneficiary_id, body, user) {
        await this.beneficiaryService.findOne(beneficiary_id, user);
        const result = await this.beneficiaryService.update(beneficiary_id, body);
        return new utils_1.AppResponse(result, 'Updated Beneficiary Detail Successfully');
    }
};
exports.BeneficiaryController = BeneficiaryController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create Beneficiary' }),
    (0, swagger_1.ApiOkResponse)({ type: beneficiary_entity_1.EntityCreateBeneficiary }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateBeneficiaryDto,
        user_entity_1.BaseResUser]),
    __metadata("design:returntype", Promise)
], BeneficiaryController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all Beneficiary' }),
    (0, swagger_1.ApiOkResponse)({
        type: beneficiary_entity_1.EntityGetBeneficiaryList,
    }),
    (0, common_1.Get)(),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.BaseResUser]),
    __metadata("design:returntype", Promise)
], BeneficiaryController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get Beneficiary by id' }),
    (0, swagger_1.ApiOkResponse)({ type: beneficiary_entity_1.EntityGetBeneficiary }),
    (0, common_1.Get)(':beneficiary_id'),
    __param(0, (0, common_1.Param)('beneficiary_id')),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.BaseResUser]),
    __metadata("design:returntype", Promise)
], BeneficiaryController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update Beneficiary' }),
    (0, swagger_1.ApiOkResponse)({ type: beneficiary_entity_1.EntityUpdateBeneficiary }),
    (0, common_1.Put)(':beneficiary_id'),
    __param(0, (0, common_1.Param)('beneficiary_id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateBeneficiaryDto,
        user_entity_1.BaseResUser]),
    __metadata("design:returntype", Promise)
], BeneficiaryController.prototype, "update", null);
exports.BeneficiaryController = BeneficiaryController = __decorate([
    (0, common_1.Controller)('beneficiary'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBadRequestResponse)({
        type: utils_1.EntityErrorResponse,
    }),
    (0, swagger_1.ApiTags)('Beneficiary'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(session_interceptor_1.SessionInterceptor),
    __metadata("design:paramtypes", [beneficiary_service_1.BeneficiaryService])
], BeneficiaryController);
//# sourceMappingURL=beneficiary.controller.js.map
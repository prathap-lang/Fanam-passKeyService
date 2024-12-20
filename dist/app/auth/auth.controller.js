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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_helper_1 = require("../../helper/common.helper");
const prisma_service_1 = require("../../prisma/prisma.service");
const utils_1 = require("../../utils");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const login_entity_1 = require("./login.entity");
let AuthController = class AuthController {
    constructor(authService, prisma) {
        this.authService = authService;
        this.prisma = prisma;
    }
    async login(input) {
        const result = await this.authService.login(input);
        return new utils_1.AppResponse(result, 'Authorized successfully');
    }
    async signUp(input) {
        const result = await this.authService.signUp(input);
        return new utils_1.AppResponse(result, 'Authorized successfully');
    }
    async forgotPin(input) {
        const result = await this.authService.forgotPin(input);
        return new utils_1.AppResponse(result, 'Authorized successfully');
    }
    async refreshToken(req) {
        const user = await this.prisma.user.findUnique({
            where: {
                user_id: req.user.user_id,
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        const token = req.headers.authorization?.split(' ')[1];
        const refreshToken = user.token;
        if (!token)
            throw new common_1.BadRequestException('Authorization token missing in the request');
        if (refreshToken && !refreshToken.includes(token)) {
            throw new common_1.BadRequestException('Invalid Token');
        }
        const result = await this.authService.refreshToken(token, process.env.JWT_SECRET_APP);
        await (0, common_helper_1.addRefreshToken)(this.prisma, user.user_id, result.access_token, result.refresh_token);
        await (0, common_helper_1.removeRefreshToken)(this.prisma, user.user_id, token);
        return new utils_1.AppResponse(result, 'Token refreshed successfully');
    }
    async logOut(req, input) {
        await (0, common_helper_1.logout)(this.prisma, req, input);
        return new utils_1.AppResponse(null, 'logged out successfully');
    }
    async logOutFromAllDevices(req) {
        await (0, common_helper_1.logoutAll)(this.prisma, req);
        return new utils_1.AppResponse(null, 'logged out from all devices successfully');
    }
    async findOne(bank_name) {
        const result = await this.authService.findOne(bank_name);
        return new utils_1.AppResponse(result, 'Fetched Bank Detail Successfully');
    }
    async createTokenWithBank(body) {
        const result = await this.authService.createTokenWithBank(body);
        return new utils_1.AppResponse(result, 'Token Generated Successfully');
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiOkResponse)({ type: login_entity_1.EntityLogin }),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ type: login_entity_1.EntityLogin }),
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.SignUpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ type: login_entity_1.EntityLogin }),
    (0, common_1.Put)('forgot-pin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.ForgotPinDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPin", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOkResponse)({
        type: login_entity_1.EntityLogin,
    }),
    (0, common_1.Post)('refresh-token'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Logout user' }),
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, login_dto_1.LogOutDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logOut", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Logout user from all devices' }),
    (0, common_1.Post)('logout-all'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logOutFromAllDevices", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get Handshake Bank Details' }),
    (0, common_1.Get)('client/:bank_name'),
    __param(0, (0, common_1.Param)('bank_name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'AccesToken Related Bank' }),
    (0, common_1.Post)('client/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.CreateHandshakeWithBankDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createTokenWithBank", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('Auth'),
    (0, swagger_1.ApiBadRequestResponse)({
        type: utils_1.EntityErrorResponse,
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        prisma_service_1.PrismaService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map
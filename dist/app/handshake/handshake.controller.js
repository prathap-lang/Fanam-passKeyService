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
exports.HandshakeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const utils_1 = require("../../utils");
const handshake_dto_1 = require("./dto/handshake.dto");
const handshake_service_1 = require("./handshake.service");
let HandshakeController = class HandshakeController {
    constructor(handshakeService) {
        this.handshakeService = handshakeService;
    }
    async findOne(bank_name) {
        const result = await this.handshakeService.findOne(bank_name);
        return new utils_1.AppResponse(result, 'Fetched Bank Detail Successfully');
    }
    async createTokenWithBank(body) {
        const result = await this.handshakeService.createTokenWithBank(body);
        return new utils_1.AppResponse(result, 'Token Generated Successfully');
    }
};
exports.HandshakeController = HandshakeController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get Handshake Bank Details' }),
    (0, common_1.Get)(':bank_name'),
    __param(0, (0, common_1.Param)('bank_name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HandshakeController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'AccesToken Related Bank' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [handshake_dto_1.CreateHandshakeWithBankDto]),
    __metadata("design:returntype", Promise)
], HandshakeController.prototype, "createTokenWithBank", null);
exports.HandshakeController = HandshakeController = __decorate([
    (0, common_1.Controller)('handshake'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBadRequestResponse)({
        type: utils_1.EntityErrorResponse,
    }),
    (0, swagger_1.ApiTags)('Handshake'),
    __metadata("design:paramtypes", [handshake_service_1.HandshakeService])
], HandshakeController);
//# sourceMappingURL=handshake.controller.js.map
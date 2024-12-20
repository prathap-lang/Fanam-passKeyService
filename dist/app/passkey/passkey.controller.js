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
exports.PasskeyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const utils_1 = require("../../utils");
const passkey_service_1 = require("./passkey.service");
let PasskeyController = class PasskeyController {
    constructor(passkeyService) {
        this.passkeyService = passkeyService;
    }
    async startRegistration(req) {
        const options = await this.passkeyService.generateRegistrationOptions(req);
        return new utils_1.AppResponse(options, 'Registration initiated Successfully');
    }
    async finishRegistration(data, req) {
        const verified = await this.passkeyService.verifyRegistrationResponseHandler(data, req);
        return new utils_1.AppResponse(verified, 'Registration Completed Successfully');
    }
    async startAuthentication(credentialId) {
        const options = await this.passkeyService.generateAuthenticationOptions(credentialId);
        return new utils_1.AppResponse(options, 'Authentication Initiated Successfully');
    }
    async finishAuthentication(data) {
        const verified = await this.passkeyService.verifyAuthenticationResponse(data);
        return new utils_1.AppResponse(verified, 'Authentication Completed Successfully');
    }
};
exports.PasskeyController = PasskeyController;
__decorate([
    (0, common_1.Get)('register-start'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PasskeyController.prototype, "startRegistration", null);
__decorate([
    (0, common_1.Post)('register-finish'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PasskeyController.prototype, "finishRegistration", null);
__decorate([
    (0, common_1.Get)('login-start'),
    __param(0, (0, common_1.Query)('credentialId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PasskeyController.prototype, "startAuthentication", null);
__decorate([
    (0, common_1.Post)('login-finish'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PasskeyController.prototype, "finishAuthentication", null);
exports.PasskeyController = PasskeyController = __decorate([
    (0, swagger_1.ApiTags)('passkey'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBadRequestResponse)({
        type: utils_1.EntityErrorResponse,
    }),
    (0, common_1.Controller)('passkey'),
    __metadata("design:paramtypes", [passkey_service_1.PasskeyService])
], PasskeyController);
//# sourceMappingURL=passkey.controller.js.map
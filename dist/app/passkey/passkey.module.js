"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasskeyModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../../prisma/prisma.service");
const passkey_controller_1 = require("./passkey.controller");
const passkey_service_1 = require("./passkey.service");
let PasskeyModule = class PasskeyModule {
};
exports.PasskeyModule = PasskeyModule;
exports.PasskeyModule = PasskeyModule = __decorate([
    (0, common_1.Module)({
        controllers: [passkey_controller_1.PasskeyController],
        providers: [passkey_service_1.PasskeyService, prisma_service_1.PrismaService, config_1.ConfigService, jwt_1.JwtService],
    })
], PasskeyModule);
//# sourceMappingURL=passkey.module.js.map
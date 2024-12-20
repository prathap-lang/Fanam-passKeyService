"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronConfigModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("../app/auth/auth.service");
const user_service_1 = require("../app/user/user.service");
const helper_1 = require("../helper");
const prisma_service_1 = require("../prisma/prisma.service");
const cron_config_controller_1 = require("./cron-config.controller");
const cron_config_service_1 = require("./cron-config.service");
let CronConfigModule = class CronConfigModule {
};
exports.CronConfigModule = CronConfigModule;
exports.CronConfigModule = CronConfigModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: process.env.JWT_TOKEN_SECRET,
                signOptions: { algorithm: 'HS512', expiresIn: '1d' },
            }),
        ],
        controllers: [cron_config_controller_1.CronConfigController],
        providers: [
            cron_config_service_1.CronConfigService,
            prisma_service_1.PrismaService,
            auth_service_1.AuthService,
            user_service_1.UserService,
            helper_1.AzureHelper,
        ],
    })
], CronConfigModule);
//# sourceMappingURL=cron-config.module.js.map
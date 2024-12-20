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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronConfigService = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../app/auth/auth.service");
const prisma_service_1 = require("../prisma/prisma.service");
let CronConfigService = class CronConfigService {
    constructor(prisma, auth) {
        this.prisma = prisma;
        this.auth = auth;
    }
    async tokenRemovalCron() {
        const users = await this.prisma.user.findMany();
        if (users?.length) {
            for (const user of users) {
                const currentTimestamp = Math.floor(Date.now() / 1000);
                const newCurrentStamp = 19800 + currentTimestamp;
                const updatedRefreshTokens = [];
                const updatedInvalidTokens = [];
                const updatedAccessTokens = [];
                const refreshTokens = user.token;
                const invalidTokens = user.invalidToken;
                const accessTokens = user.access_token;
                if (refreshTokens?.length) {
                    for (const token of refreshTokens) {
                        const parseToken = await this.auth.verifyToken(String(token), process.env.JWT_TOKEN_SECRET);
                        if (!parseToken) {
                            continue;
                        }
                        if (parseToken?.exp > newCurrentStamp) {
                            updatedRefreshTokens.push(token);
                        }
                    }
                }
                if (invalidTokens?.length) {
                    for (const token of invalidTokens) {
                        const parseToken = await this.auth.verifyToken(String(token), process.env.JWT_TOKEN_SECRET);
                        if (!parseToken) {
                            continue;
                        }
                        if (parseToken?.exp > newCurrentStamp) {
                            updatedInvalidTokens.push(token);
                        }
                    }
                }
                if (accessTokens?.length) {
                    for (const token of accessTokens) {
                        const parseToken = await this.auth.verifyToken(String(token), process.env.JWT_TOKEN_SECRET);
                        if (!parseToken) {
                            continue;
                        }
                        if (parseToken?.exp > newCurrentStamp) {
                            updatedAccessTokens.push(token);
                        }
                    }
                }
                await this.prisma.user.update({
                    where: { user_id: user.user_id },
                    data: {
                        token: updatedRefreshTokens,
                        invalidToken: updatedInvalidTokens,
                        access_token: updatedAccessTokens,
                    },
                });
            }
        }
    }
};
exports.CronConfigService = CronConfigService;
exports.CronConfigService = CronConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        auth_service_1.AuthService])
], CronConfigService);
//# sourceMappingURL=cron-config.service.js.map
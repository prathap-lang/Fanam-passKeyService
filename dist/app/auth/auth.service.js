"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const bcrypt = __importStar(require("bcrypt"));
const common_helper_1 = require("../../helper/common.helper");
const prisma_service_1 = require("../../prisma/prisma.service");
const common_const_1 = require("utils/common.const");
let AuthService = class AuthService {
    constructor(userService, jwtService, prisma) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.prisma = prisma;
    }
    async login({ phone_no, pin }) {
        const user = await this.prisma.user.findUnique({
            where: { phone_no },
        });
        if (!user || user.status === UserStatus.BLOCKED)
            throw new common_1.NotFoundException('Unauthorized');
        const decryptedPin = atob(pin);
        const verifyUser = await bcrypt.compare(decryptedPin, user.pin);
        if (!verifyUser) {
            const data = {
                noOfWrongPinAttempts: { increment: 1 },
            };
            if (user.noOfWrongPinAttempts >= 2) {
                data.status = UserStatus.BLOCKED;
            }
            const updateUser = await this.prisma.user.update({
                where: {
                    user_id: user.user_id,
                },
                data,
            });
            if (updateUser.status === UserStatus.BLOCKED) {
                throw new common_1.BadRequestException('Invalid user/pin, you have reached the limit of incorrect pin attempts');
            }
            throw new common_1.BadRequestException(`Invalid user/pin`);
        }
        const tokens = {
            access_token: this.jwtService.sign({ user_id: user.user_id }, {
                secret: process.env.JWT_TOKEN_SECRET,
                expiresIn: '1d',
            }),
            refresh_token: this.jwtService.sign({ user_id: user.user_id }, {
                secret: process.env.JWT_TOKEN_SECRET,
                expiresIn: '7d',
            }),
        };
        await (0, common_helper_1.addRefreshToken)(this.prisma, user.user_id, tokens.access_token, tokens.refresh_token);
        return tokens;
    }
    async signUp({ first_name, last_name, email, phone_no, newPin, confirmPin, }) {
        const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
        const isValid = regex.test(email);
        if (!isValid) {
            throw new common_1.BadRequestException('Invalid email');
        }
        const decryptedPin = atob(newPin);
        const decryptedConfirmPin = atob(confirmPin);
        if (decryptedPin !== decryptedConfirmPin) {
            throw new common_1.BadRequestException('pin mismatch');
        }
        const users = await this.prisma.user.findMany({
            where: {
                OR: [{ email }, { phone_no }],
            },
        });
        if (users.length)
            throw new common_1.BadRequestException('User already exists with this phone_no or email');
        const country = await this.prisma.country.findUnique({
            where: {
                is_active: true,
            },
        });
        if (!country) {
            throw new common_1.NotFoundException(`Country not found `);
        }
        const country_code = `+${country.phone_code.toString()}`;
        const salt = await bcrypt.genSalt(common_const_1.SALTROUNDS);
        const hashedPassword = await bcrypt.hash(decryptedPin, salt);
        const { user_id } = await this.prisma.user.create({
            data: {
                first_name,
                last_name,
                email,
                country_code,
                phone_no,
                pin: hashedPassword,
            },
        });
        await this.prisma.passwordHistory.create({
            data: { hashed_password: hashedPassword, user: { connect: { user_id } } },
        });
        if (!user_id)
            throw new common_1.BadRequestException('something went wrong');
        const tokens = {
            access_token: this.jwtService.sign({ user_id }, {
                secret: process.env.JWT_TOKEN_SECRET,
                expiresIn: common_const_1.PERMANENT_TOKEN_EXPIRES_IN,
            }),
            refresh_token: this.jwtService.sign({ user_id }, {
                secret: process.env.JWT_TOKEN_SECRET,
                expiresIn: common_const_1.REFRESH_TOKEN_EXPIRES_IN,
            }),
        };
        await (0, common_helper_1.addRefreshToken)(this.prisma, user_id, tokens.access_token, tokens.refresh_token);
        return tokens;
    }
    async forgotPin({ newPin, confirmPin, phone_no }) {
        const user = await this.prisma.user.findUnique({ where: { phone_no } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const decryptedPin = atob(newPin);
        const decryptedConfirmPin = atob(confirmPin);
        if (decryptedPin !== decryptedConfirmPin) {
            throw new common_1.BadRequestException('pin mismatch');
        }
        const verifyUser = await bcrypt.compare(decryptedPin, user.pin);
        if (verifyUser)
            throw new common_1.BadRequestException("New pin shouldn't be your old pin");
        const data = {};
        if (user.status === UserStatus.BLOCKED) {
            data.status = UserStatus.ACTIVE;
        }
        const passwordHistory = await this.validateNewPassword(user.user_id, decryptedConfirmPin);
        if (!passwordHistory) {
            throw new common_1.BadRequestException('Current password should not be same as last 10 password');
        }
        const salt = await bcrypt.genSalt(common_const_1.SALTROUNDS);
        const hashedPassword = await bcrypt.hash(decryptedPin, salt);
        data.pin = hashedPassword;
        data.password_history = { create: { hashed_password: hashedPassword } };
        data.noOfWrongPinAttempts = 0;
        const { user_id, password_history } = await this.prisma.user.update({
            where: { user_id: user.user_id },
            data,
            include: { password_history: { orderBy: { created_at: 'asc' } } },
        });
        if (!user_id)
            throw new common_1.BadRequestException('Something went wrong');
        if (password_history.length > 10) {
            await this.prisma.passwordHistory.delete({
                where: { hash_id: password_history[0].hash_id },
            });
        }
        const tokens = {
            access_token: this.jwtService.sign({ user_id }, {
                secret: process.env.JWT_TOKEN_SECRET,
                expiresIn: common_const_1.PERMANENT_TOKEN_EXPIRES_IN,
            }),
            refresh_token: this.jwtService.sign({ user_id }, {
                secret: process.env.JWT_TOKEN_SECRET,
                expiresIn: common_const_1.REFRESH_TOKEN_EXPIRES_IN,
            }),
        };
        await (0, common_helper_1.addRefreshToken)(this.prisma, user_id, tokens.access_token, tokens.refresh_token);
        return tokens;
    }
    async refreshToken(token, secret) {
        try {
            const parseToken = this.jwtService.verify(token, {
                secret,
            });
            const currentTimestamp = Math.floor(Date.now() / 1000);
            if (parseToken.exp && parseToken.exp < currentTimestamp) {
                throw new common_1.BadRequestException('Token has expired');
            }
            const payload = {
                userId: parseToken.userId,
            };
            const newToken = this.jwtService.sign(payload, {
                secret,
                expiresIn: common_const_1.PERMANENT_TOKEN_EXPIRES_IN,
            });
            const refreshToken = this.jwtService.sign(payload, {
                secret,
                expiresIn: common_const_1.REFRESH_TOKEN_EXPIRES_IN,
            });
            return {
                access_token: newToken,
                refresh_token: refreshToken,
            };
        }
        catch (error) {
            if (error) {
                printLog(error);
                throw new common_1.BadRequestException('Invalid Token');
            }
        }
    }
    async validateNewPassword(user_id, newPassword) {
        const passwordHistories = await this.prisma.passwordHistory.findMany({
            where: { user_id: user_id },
        });
        for (const history of passwordHistories) {
            if (await bcrypt.compare(newPassword, history.hashed_password)) {
                return false;
            }
        }
        return true;
    }
    async verifyToken(token, secret) {
        let parsedToken;
        try {
            parsedToken = await this.jwtService.verify(token, {
                secret,
            });
        }
        catch (error) {
            console.log('cron: Token Expired');
        }
        return parsedToken;
    }
    async findOne(bank_name) {
        const result = {
            bank_name: 'icic',
            client_id: '1234567',
            client_secret: 'admin_123_icic',
        };
        return result;
    }
    async createTokenWithBank({ code, bank_id }) {
        const result = {
            access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
            refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        };
        return result;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
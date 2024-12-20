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
exports.PasskeyService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const server_1 = require("@simplewebauthn/server");
const prisma_service_1 = require("../../prisma/prisma.service");
let PasskeyService = class PasskeyService {
    constructor(configService, prisma, jwtService) {
        this.configService = configService;
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.rpName = this.configService.get('RP_NAME') || 'fanamPay';
        this.rpID = this.configService.get('RP_ID') || process.env.RP_ID;
        this.origin = this.configService.get('ORIGIN') || process.env.ORIGIN;
    }
    async generateRegistrationOptions(req) {
        try {
            const encoder = new TextEncoder();
            const userIdUint8Array = encoder.encode(req.user_id);
            const user = await this.prisma.user.findUnique({
                where: { user_id: req.user_id },
            });
            const opt = await (0, server_1.generateRegistrationOptions)({
                rpName: this.rpName,
                rpID: this.rpID,
                userID: userIdUint8Array,
                userName: user.first_name,
                attestationType: 'direct',
                authenticatorSelection: {
                    residentKey: 'preferred',
                    userVerification: 'preferred',
                    authenticatorAttachment: 'platform',
                },
                supportedAlgorithmIDs: [-7, -257],
            });
            return opt;
        }
        catch (error) {
            console.log(error, '<<<<<<<<<<< error');
        }
    }
    async verifyRegistrationResponseHandler(data, req) {
        try {
            const userPasskeys = await this.prisma.passkey.findMany({
                where: { user_id: req.user_id },
            });
            const cred_id = userPasskeys.map((it) => {
                return it.cred_id;
            });
            const { challenge } = data;
            delete data.challenge;
            const verification = {
                response: data,
                expectedChallenge: challenge,
                expectedOrigin: this.origin,
                expectedRPID: this.rpID,
                requireUserVerification: false,
            };
            const result = await (0, server_1.verifyRegistrationResponse)(verification);
            if (!result) {
                throw new common_1.BadRequestException(`verification failed`);
            }
            if (cred_id.includes(result.registrationInfo.credentialID)) {
                throw new common_1.BadRequestException('Device Already Registered');
            }
            await this.prisma.passkey.create({
                data: {
                    user: { connect: { user_id: req.user_id } },
                    cred_id: result.registrationInfo.credentialID,
                    counter: result.registrationInfo.counter,
                    cred_public_key: JSON.stringify(result.registrationInfo.credentialPublicKey),
                    transports: data.response.transports,
                    webauth_user_id: req.user_id,
                    device_type: result.registrationInfo.credentialDeviceType,
                    credential_type: result.registrationInfo.credentialType,
                },
            });
            const resultData = {
                verified: result.verified,
                cred_id: result.registrationInfo.credentialID,
            };
            return resultData;
        }
        catch (err) {
            console.error('Verification failed:', err);
            throw err;
        }
    }
    async generateAuthenticationOptions(credentialId) {
        const userPasskey = await this.prisma.passkey.findUnique({
            where: { cred_id: credentialId },
            include: { user: { include: { passkey: true } } },
        });
        if (!userPasskey) {
            throw new common_1.BadRequestException('No User Passkey Data Found');
        }
        const options = await (0, server_1.generateAuthenticationOptions)({
            rpID: this.rpID,
            userVerification: 'preferred',
            allowCredentials: userPasskey.user.passkey.map((cred) => ({
                id: cred.cred_id,
                transports: cred.transports,
            })),
        });
        return options;
    }
    async verifyAuthenticationResponse(data) {
        const userPasskey = await this.prisma.passkey.findFirst({
            where: { cred_id: data.id },
            include: { user: { select: { user_id: true } } },
        });
        if (!userPasskey) {
            throw new common_1.BadRequestException('No User Passkey Data Found');
        }
        let verification;
        const credentialPublicKeyObject = JSON.parse(userPasskey.cred_public_key);
        const credentialPublicKeyBuffer = Buffer.from(Object.values(credentialPublicKeyObject));
        try {
            const opts = {
                response: data,
                expectedChallenge: data.challenge,
                expectedOrigin: this.origin,
                expectedRPID: this.rpID,
                authenticator: {
                    credentialID: userPasskey.cred_id,
                    credentialPublicKey: credentialPublicKeyBuffer,
                    counter: userPasskey.counter,
                    transports: userPasskey.transports,
                },
                requireUserVerification: false,
            };
            verification = await (0, server_1.verifyAuthenticationResponse)(opts);
            if (verification.verified) {
                return verification;
            }
            else {
                throw new common_1.UnauthorizedException('Authentication Failed');
            }
        }
        catch (error) {
            console.error(error.message);
        }
    }
};
exports.PasskeyService = PasskeyService;
exports.PasskeyService = PasskeyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        prisma_service_1.PrismaService,
        jwt_1.JwtService])
], PasskeyService);
//# sourceMappingURL=passkey.service.js.map
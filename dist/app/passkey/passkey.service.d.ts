import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { VerifiedAuthenticationResponse } from '@simplewebauthn/server';
import { PublicKeyCredentialCreationOptionsJSON, PublicKeyCredentialRequestOptionsJSON } from '@simplewebauthn/server/script/deps';
import { PrismaService } from 'prisma/prisma.service';
export declare class PasskeyService {
    private configService;
    private readonly prisma;
    private jwtService;
    private rpName;
    private rpID;
    private origin;
    constructor(configService: ConfigService, prisma: PrismaService, jwtService: JwtService);
    generateRegistrationOptions(req: any): Promise<PublicKeyCredentialCreationOptionsJSON>;
    verifyRegistrationResponseHandler(data: any, req: any): Promise<{
        verified: boolean;
        cred_id: string;
    }>;
    generateAuthenticationOptions(credentialId: string): Promise<PublicKeyCredentialRequestOptionsJSON>;
    verifyAuthenticationResponse(data: any): Promise<VerifiedAuthenticationResponse>;
}

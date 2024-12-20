import { AppResponse } from 'utils';
import { PasskeyService } from './passkey.service';
export declare class PasskeyController {
    private readonly passkeyService;
    constructor(passkeyService: PasskeyService);
    startRegistration(req: any): Promise<AppResponse<import("@simplewebauthn/server/script/deps").PublicKeyCredentialCreationOptionsJSON>>;
    finishRegistration(data: any, req: any): Promise<AppResponse<{
        verified: boolean;
        cred_id: string;
    }>>;
    startAuthentication(credentialId: string): Promise<AppResponse<import("@simplewebauthn/server/script/deps").PublicKeyCredentialRequestOptionsJSON>>;
    finishAuthentication(data: any): Promise<AppResponse<import("@simplewebauthn/server").VerifiedAuthenticationResponse>>;
}

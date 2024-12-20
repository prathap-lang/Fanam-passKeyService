export declare class FirebaseService {
    constructor();
    verifyToken(token: string): Promise<import("firebase-admin/lib/auth/token-verifier").DecodedIdToken>;
}

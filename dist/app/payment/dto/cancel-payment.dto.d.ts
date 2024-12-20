export declare class CancelPayment {
    transaction_id: string;
    cancel_reason: string;
}
export declare class EncryptPayload {
    proposalId: string;
    transactionStatus: string;
}
export declare class CreateEncryptPayload {
    payment: EncryptPayload;
}

export declare class CreateOrderDto {
    transaction_id: string;
}
export declare class UpdateCrossBorderDto {
    transactionDateTime?: string;
    settlementCurrencyCode?: string;
    payoutId?: string;
    clientReferenceId: string;
    payoutSpeed?: string;
    notificationDateTime: string;
    initiatingPartyId: string;
    fxConversionRate?: number;
    expectedPostingDate?: string;
    destinationCurrencyCode?: string;
    transactionAmount?: number;
    transactionCurrencyCode?: string;
    endToEndId?: string;
    payoutMethod?: string;
    settlementAmount?: number;
    status: string;
    destinationAmount?: number;
}
export declare class webhookRazorDto {
    id: string;
    paymentId: string;
    event: string;
    amount: number;
    paymentMethod: string;
}
export declare class webhookVisaDto {
    payoutId: string;
    status: string;
}

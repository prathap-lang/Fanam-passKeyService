declare class BankDetailDto {
    bankCode: string;
    bankCodeType: string;
    accountNumberType: string;
    accountName: string;
    countryCode: string;
    bankName: string;
    accountNumber: string;
    currencyCode: string;
}
declare class AddressDto {
    country: string;
    city: string;
    postalCode: string;
    addressLine1: string;
    state: string;
}
declare class RecipientDetailDto {
    lastName: string;
    firstName: string;
    bank: BankDetailDto;
    address: AddressDto;
    type: string;
}
declare class SenderDetailDto {
    address: AddressDto;
    name: string;
    type: string;
    senderAccountNumber: string;
}
declare class TransactionDetailDto {
    initiatingPartyId: number;
    businessApplicationId: string;
    statementNarrative: string;
    transactionAmount: number;
    transactionCurrencyCode: string;
    settlementCurrencyCode: string;
    clientReferenceId: string;
    senderSourceOfFunds: string;
}
export declare class PayoutDto {
    recipientDetail: RecipientDetailDto;
    senderDetail: SenderDetailDto;
    payoutMethod: string;
    transactionDetail: TransactionDetailDto;
}
export {};

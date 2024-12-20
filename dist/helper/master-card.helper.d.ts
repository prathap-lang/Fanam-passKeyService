import { VisaFxDto } from 'app/payment/dto/visa-fx-rate.dto';
import { LoggerService } from 'logger.service';
import { JweEncryption } from 'mastercard-client-encryption';
import { PdfService } from 'pdf/pdf.service';
import { RazorpayService } from 'razorpay/razorpay.service';
export declare function getEncryptionConfig(encryptionPath: string, privateKeyPath: string): Promise<{
    paths: {
        path: string;
        toEncrypt: {
            element: string;
            obj: string;
        }[];
        toDecrypt: {
            element: string;
            obj: string;
        }[];
    }[];
    mode: string;
    encryptedValueFieldName: string;
    encryptionCertificate: string;
    privateKey: string;
}>;
export declare function signInProvider(signingPath: string): Promise<string>;
export declare function masterCardQuote(transaction_id: string): Promise<unknown>;
export declare function encryptPayload(payload: any, config: any): Promise<string>;
export declare function decryptResponse(response: any, config: any): Promise<unknown>;
export declare function onResult(d: string, jwe: JweEncryption): Promise<unknown>;
export declare function authorizationHeader(url: string, method: string, data: any, consumerKey: string, signingKey: any): Promise<string>;
export declare function masterCardCurrencyConvertor({ source_amount, destination_amount, source_country_code, destination_country_code, }: VisaFxDto): Promise<{
    conversion_rate: string;
    source_amount: string;
    destination_amount: string;
}>;
export declare function masterCardQuoteConfirmation(transaction_id: string, razorpayService: RazorpayService, pdf: PdfService, log: LoggerService): Promise<{
    order: {
        amount: number;
        order_id: string;
        order_no: string;
        razorpay_order_id: string;
        order_status: import("@prisma/client").$Enums.EnumOrderStatus;
        payment_status: string;
        payout_id: string;
        client_reference_id: string;
        payout_speed: string;
        initiating_party_id: string;
        proposal_id: string;
        fx_conversion_rate: string;
    };
} & {
    transaction_id: string;
    sender_account_type: import("@prisma/client").$Enums.EnumAccount;
    recipient_account_type: import("@prisma/client").$Enums.EnumAccount;
    source_country_id: number;
    destination_country_id: number;
    exchange_amount: number;
    destination_amount: number;
    markup_fee: number;
    other_fee: number;
    final_amount: number;
    purpose: import("@prisma/client").$Enums.EnumPurpose;
    reason: string;
    status: import("@prisma/client").$Enums.EnumTransactionStatus;
    visa_quote_id: string;
    master_card_transaction_id: string;
    master_card_proposal_id: string;
    expiration_time: Date;
    is_checkout: boolean;
    recipient_id: string;
    recipient_relationship: import("@prisma/client").$Enums.EnumRelationship;
    beneficiary_id: string;
    transfer_time_id: string;
    created_by_id: string;
    created_at: Date;
    updated_at: Date;
}>;
export declare function masterCardPayout(transaction_id: string): Promise<unknown>;
export declare function masterCardWebhookdecrypt(response: string): Promise<any>;

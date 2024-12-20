import { Relationship, TransactionPurpose } from 'utils';
export declare class CreateTransactionDto {
    recipient_id: string;
}
export declare class UpdateTransactionDto {
    recipient_id: string;
    beneficiary_id: string;
    source_country_id: number;
    destination_country_id: number;
    exchange_amount: string;
    destination_amount: string;
    transfer_time_id: string;
    visa_quote_id: string;
    purpose: TransactionPurpose;
    reason: string;
    recipient_relationship: Relationship;
    is_same_person: boolean;
}

import { VisaFxDto } from 'app/payment/dto/visa-fx-rate.dto';
export declare function visaFxRateConversion({ source_amount, destination_amount, source_country_code, destination_country_code, }: VisaFxDto): Promise<{
    conversion_rate: string;
    source_amount: string;
    destination_amount: string;
    quote_id: number;
}>;
export declare function visaFxRatePopularCorridors(): Promise<any[]>;
export declare function visaPayoutServices(transaction_id: string): Promise<string>;
export declare function cancelPymentVisaHelper(order_id: string): Promise<import("axios").AxiosResponse<any, any>>;

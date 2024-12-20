import { BaseResUser } from 'app/user/user.entity';
import { LoggerService } from 'logger.service';
import { PrismaService } from 'prisma/prisma.service';
import { AppResponse } from 'utils';
import { RazorpayService } from '../../razorpay/razorpay.service';
import { CreateOrderDto } from './dto';
import { OrderService } from './order.service';
export declare class OrderController {
    private readonly OrderService;
    private readonly prisma;
    private readonly razorpayService;
    private readonly log;
    constructor(OrderService: OrderService, prisma: PrismaService, razorpayService: RazorpayService, log: LoggerService);
    createOrder(createOrder: CreateOrderDto, user: BaseResUser): Promise<AppResponse<{
        order: {
            order_id: string;
            order_no: string;
            amount: number;
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
    }>>;
    findOne(order_id: string): Promise<AppResponse<{
        order: {
            order_id: string;
            order_no: string;
            amount: number;
            razorpay_order_id: string;
            order_status: import("@prisma/client").$Enums.EnumOrderStatus;
            payment_status: string;
            payout_id: string;
            client_reference_id: string;
            payout_speed: string;
            initiating_party_id: string;
            proposal_id: string;
            fx_conversion_rate: string;
            payment: {
                status: import("@prisma/client").$Enums.EnumOrderStatus;
                amount: number;
                payment_id: string;
                razorpay_payment_id: string;
                paymentMethod: string;
                invoiceId: string;
            };
        };
        source_country: {
            country_id: number;
            country_name: string;
            iso2: string;
            emojiU: string;
            phone_code: string;
            currency: string;
        };
        destination_country: {
            country_id: number;
            country_name: string;
            iso2: string;
            emojiU: string;
            phone_code: string;
            currency: string;
        };
        invoice: {
            attachment_id: string;
            file_name: string;
            mime: string;
        }[];
        recipient: {
            phone_no: string;
            first_name: string;
            last_name: string;
            email: string;
            address_line_1: string;
            address_line_2: string;
            zip_code: string;
            country: {
                country_id: number;
                country_name: string;
                phone_code: string;
                currency: string;
            };
            state: {
                state_id: number;
                state_name: string;
            };
            city: {
                city_id: number;
                city_name: string;
            };
            recipient_id: string;
            bank_account: {
                account_type: import("@prisma/client").$Enums.EnumBankAccountType;
                account_no: string;
                bank_name: string;
                account_id: string;
                account_holder: string;
                iban_no: string;
                swift_code: string;
                bsb_code: string;
                routing_code: string;
                branch_code: string;
                bank_code_type: import("@prisma/client").$Enums.EnumBankCodeType;
                branch_address: string;
            };
        };
        beneficiary: {
            country: {
                country_id: number;
                country_name: string;
                iso2: string;
                emojiU: string;
                phone_code: string;
                currency: string;
            };
            state: {
                state_id: number;
                state_name: string;
            };
            city: {
                city_id: number;
                city_name: string;
            };
        } & {
            beneficiary_id: string;
            first_name: string;
            last_name: string;
            email: string;
            country_id: number;
            phone_no: string;
            relationship: string;
            account_no: string;
            address: string;
            notes: string;
            state_id: number;
            city_id: number;
            zip_code: string;
            created_by_id: string;
            created_at: Date;
            updated_at: Date;
        };
        created_by: {
            user_id: string;
            customer_hash: string;
            first_name: string;
            last_name: string;
            date_of_birth: Date;
            business_name: string;
            business_type: import("@prisma/client").$Enums.EnumBusinessType;
            email: string;
            country_code: string;
            phone_no: string;
            pin: string;
            account_type: import("@prisma/client").$Enums.EnumAccount;
            account_no: string;
            address_line_1: string;
            address_line_2: string;
            token: import("@prisma/client/runtime/library").JsonValue;
            invalidToken: import("@prisma/client/runtime/library").JsonValue;
            access_token: import("@prisma/client/runtime/library").JsonValue;
            country_id: number;
            state_id: number;
            city_id: number;
            zip_code: string;
            role_id: string;
            noOfWrongPinAttempts: number;
            status: import("@prisma/client").$Enums.EnumUserStatus;
            created_at: Date;
            updated_at: Date;
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
    }>>;
    webhook(req: any): Promise<{
        statuscode: number;
        message: string;
    }>;
    crossborderwebhook(req: any): Promise<{
        statuscode: number;
        message: string;
    }>;
    mastercardwebhook(req: any): Promise<{
        statuscode: number;
        message: string;
    }>;
    createRefund(transaction_id: string, user: BaseResUser): Promise<AppResponse<string | ({
        order: {
            order_id: string;
            order_no: string;
            amount: number;
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
    })>>;
}

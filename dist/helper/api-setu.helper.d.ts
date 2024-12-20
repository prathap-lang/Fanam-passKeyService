import { BaseResUser } from 'app/user/user.entity';
import { AxiosHelper } from 'helper';
import { IPayloadGST, IPayloadOKycCaptcha, IPayloadOKycVerify, IPayloadOKycVerifyOTP, IPayloadPan, IResponseGST, IResponseOKycCaptcha, IResponseOKycComplete, IResponseOKycOTP, IResponsePan } from 'model';
import { PrismaService } from 'prisma/prisma.service';
export declare class ApiSetuHelper {
    private readonly prisma;
    private readonly user;
    axiosHelper: AxiosHelper;
    constructor(prisma: PrismaService, user: BaseResUser);
    private readonly getPanHeader;
    private readonly getOKycHeader;
    private readonly getGSTHeader;
    private getRequest;
    private postRequest;
    verifyPan: (body: IPayloadPan) => Promise<{
        user: any;
        result: IResponsePan;
    }>;
    verifyGST: (body: IPayloadGST) => Promise<IResponseGST>;
    private readonly generateAadhaarCaptcha;
    initiateRecaptcha: (body: IPayloadOKycCaptcha) => Promise<{
        user: any;
        captcha: IResponseOKycCaptcha;
    }>;
    regenerateCaptcha: () => Promise<{
        user: {
            user_id: string;
            customer_hash: string;
            first_name: string;
            last_name: string;
            date_of_birth: Date;
            business_name: string;
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
        captcha: IResponseOKycCaptcha;
    }>;
    generateAadhaarOtp: (body: IPayloadOKycVerify) => Promise<{
        user: {
            user_id: string;
            customer_hash: string;
            first_name: string;
            last_name: string;
            date_of_birth: Date;
            business_name: string;
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
        otp: IResponseOKycOTP;
    }>;
    verifyAadhaarOtp: (body: IPayloadOKycVerifyOTP) => Promise<{
        user: any;
        result: IResponseOKycComplete;
    }>;
    getOKycDetails: () => Promise<IResponseOKycComplete>;
}

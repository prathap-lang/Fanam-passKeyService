export declare class LoginDto {
    phone_no: string;
    pin: string;
}
export declare class SignUpDto {
    first_name: string;
    last_name: string;
    phone_no: string;
    email: string;
    newPin: string;
    confirmPin: string;
}
declare const ForgotPinDto_base: import("@nestjs/common").Type<Pick<SignUpDto, "newPin" | "confirmPin">>;
export declare class ForgotPinDto extends ForgotPinDto_base {
    phone_no: string;
}
export declare class LogOutDto {
    refreshToken: string;
}
export declare class CreateHandshakeWithBankDto {
    bankcode_string: string;
    bank_id: string;
}
export {};

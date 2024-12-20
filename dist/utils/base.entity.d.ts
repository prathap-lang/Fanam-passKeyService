export declare class BaseResponse {
    status_code: number;
    status: string;
    message: string;
    is_encrypted: boolean;
}
export declare class AppResponse<R> {
    status_code: number;
    status: string;
    message: string;
    is_encrypted: boolean;
    result: R;
    constructor(result: R, message?: string, status?: string, statusCode?: number, isEncrypted?: boolean);
}
export declare class EntityErrorResponse {
    status_code: number;
    status: string;
    message: string;
    is_encrypted: boolean;
    result: any;
}

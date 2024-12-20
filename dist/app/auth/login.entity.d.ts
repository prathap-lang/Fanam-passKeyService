import { BaseResponse } from 'utils';
export declare class ResponseLogin {
    access_token: string;
    refresh_token: string;
}
export declare class EntityLogin extends BaseResponse {
    result: ResponseLogin;
}

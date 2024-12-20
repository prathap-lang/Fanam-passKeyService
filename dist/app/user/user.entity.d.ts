import { BaseResponse } from 'utils';
export declare class BaseResUser {
    user_id: string;
    first_name: string;
    last_name: string;
    status: string;
    pin: string;
}
declare const DeleteResUser_base: import("@nestjs/common").Type<Pick<BaseResUser, "user_id">>;
export declare class DeleteResUser extends DeleteResUser_base {
}
export declare class EntityGetUser extends BaseResponse {
    result: BaseResUser;
}
export declare class EntityCreateUser extends BaseResponse {
    result: BaseResUser;
}
export declare class EntityUpdateUser extends BaseResponse {
    result: BaseResUser;
}
export declare class EntityDeleteUser extends BaseResponse {
    result: DeleteResUser;
}
export {};

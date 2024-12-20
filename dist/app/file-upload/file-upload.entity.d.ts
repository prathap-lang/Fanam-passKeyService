import { BaseResponse, TypeMime } from 'utils';
export declare class EntityAttachment {
    attachment_id: string;
    url: string;
    mime: TypeMime;
}
export declare class EntityDeleteAttachment {
    attachment_id: string;
}
export declare class EntityDeleteFile extends BaseResponse {
    result: EntityDeleteAttachment;
}

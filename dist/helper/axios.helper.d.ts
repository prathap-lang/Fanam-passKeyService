import { IApiManagerData, IApiResponseData, JSONObject } from 'model';
export declare class AxiosHelper {
    config: IApiManagerData;
    constructor(config: IApiManagerData);
    private readonly performRequest;
    getRequest: <R, E = JSONObject>(url: string, headers?: JSONObject) => Promise<IApiResponseData<R, E>>;
    postRequest: <R, P, E = JSONObject>(url: string, data: P, headers?: JSONObject) => Promise<IApiResponseData<R, E>>;
    putRequest: <R, P, E = JSONObject>(url: string, data: P, headers?: JSONObject) => Promise<IApiResponseData<R, E>>;
    deleteRequest: <R, P, E = JSONObject>(url: string, data?: P, headers?: JSONObject) => Promise<IApiResponseData<R, E>>;
}

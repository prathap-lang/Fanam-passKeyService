import {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { JSONObject } from 'model';

export interface IApiResponseData<R, E = JSONObject> {
  data?: R;
  response?: AxiosResponse;
  error?: JSONObject;
  errorResponse?: AxiosResponse;
  errorData?: E;
}

export interface IApiManagerData {
  baseUrl: string;
  headers: JSONObject;
  interceptRequest: (
    config: InternalAxiosRequestConfig,
  ) => InternalAxiosRequestConfig;
  interceptResponse: (response: AxiosResponse) => AxiosResponse;
  interceptErrorResponse: (err: any) => Promise<any>;
}

export interface IApiHook {
  apiInstance: AxiosInstance;
  postRequest: <P, R, E = JSONObject>(
    endPoint: string,
    data: P,
    headers?: JSONObject,
  ) => Promise<IApiResponseData<R, E>>;
  getRequest: <R, E = JSONObject>(
    endPoint: string,
    headers?: JSONObject,
  ) => Promise<IApiResponseData<R, E>>;
  putRequest: <P, R, E = JSONObject>(
    endPoint: string,
    data: P,
    headers?: JSONObject,
  ) => Promise<IApiResponseData<R, E>>;
  deleteRequest: <P, R, E = JSONObject>(
    endPoint: string,
    data?: P,
    headers?: JSONObject,
  ) => Promise<IApiResponseData<R, E>>;
}

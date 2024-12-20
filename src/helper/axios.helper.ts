import axios, { AxiosHeaders, AxiosResponse, Method } from 'axios';
import { IApiManagerData, IApiResponseData, JSONObject } from 'model';

export class AxiosHelper {
  config: IApiManagerData;
  constructor(config: IApiManagerData) {
    this.config = config;
  }

  /*
   *@P => Payload
   *@R => Response
   *@E => ErrorData
   */
  private readonly performRequest = async <R, P, E = JSONObject>(
    method: Method,
    url: string,
    data: P | JSONObject = {},
    headers?: JSONObject,
  ): Promise<IApiResponseData<R, E>> => {
    try {
      const {
        baseUrl,
        interceptRequest,
        interceptResponse,
        interceptErrorResponse,
        headers: configHeaders,
      } = this.config;
      const apiInstance = axios.create({
        baseURL: baseUrl,
        headers: { ...configHeaders, ...headers },
      });

      /* Interception API Request */
      apiInstance.interceptors.request.use(
        (config) => interceptRequest(config),
        (error) => Promise.reject(error),
      );

      /* Interception API Response */
      apiInstance.interceptors.response.use(
        (res) => interceptResponse(res),
        (err) => interceptErrorResponse(err),
      );
      const response = await apiInstance.request({
        method,
        url,
        data,
        headers: headers as AxiosHeaders,
      });
      if (response.status === 200 || response.status === 201) {
        return { data: response.data as R, response };
      } else throw response;
    } catch (err) {
      const error = err as JSONObject;
      const errorResponse = error['response'] as unknown as AxiosResponse;
      const errorData = errorResponse?.['data'] as E;
      let errData: IApiResponseData<R, E> = {
        error,
      };

      if (errorResponse) {
        errData = { ...errData, errorResponse };
      }

      if (errorData) {
        errData = { ...errData, errorData };
      }

      return errData;
    }
  };

  /*
   *@P => Payload
   *@R => Response
   */
  getRequest = async <R, E = JSONObject>(
    url: string,
    headers?: JSONObject,
  ): Promise<IApiResponseData<R, E>> =>
    await this.performRequest('get', url, null, headers);

  postRequest = async <R, P, E = JSONObject>(
    url: string,
    data: P,
    headers?: JSONObject,
  ): Promise<IApiResponseData<R, E>> =>
    await this.performRequest('post', url, data, headers);

  putRequest = async <R, P, E = JSONObject>(
    url: string,
    data: P,
    headers?: JSONObject,
  ): Promise<IApiResponseData<R, E>> =>
    await this.performRequest('put', url, data, headers);

  deleteRequest = async <R, P, E = JSONObject>(
    url: string,
    data?: P,
    headers?: JSONObject,
  ): Promise<IApiResponseData<R, E>> =>
    await this.performRequest('delete', url, data, headers);
}

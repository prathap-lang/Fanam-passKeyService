"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxiosHelper = void 0;
const axios_1 = __importDefault(require("axios"));
class AxiosHelper {
    constructor(config) {
        this.performRequest = async (method, url, data = {}, headers) => {
            try {
                const { baseUrl, interceptRequest, interceptResponse, interceptErrorResponse, headers: configHeaders, } = this.config;
                const apiInstance = axios_1.default.create({
                    baseURL: baseUrl,
                    headers: { ...configHeaders, ...headers },
                });
                apiInstance.interceptors.request.use((config) => interceptRequest(config), (error) => Promise.reject(error));
                apiInstance.interceptors.response.use((res) => interceptResponse(res), (err) => interceptErrorResponse(err));
                const response = await apiInstance.request({
                    method,
                    url,
                    data,
                    headers: headers,
                });
                if (response.status === 200 || response.status === 201) {
                    return { data: response.data, response };
                }
                else
                    throw response;
            }
            catch (err) {
                const error = err;
                const errorResponse = error['response'];
                const errorData = errorResponse?.['data'];
                let errData = {
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
        this.getRequest = async (url, headers) => await this.performRequest('get', url, null, headers);
        this.postRequest = async (url, data, headers) => await this.performRequest('post', url, data, headers);
        this.putRequest = async (url, data, headers) => await this.performRequest('put', url, data, headers);
        this.deleteRequest = async (url, data, headers) => await this.performRequest('delete', url, data, headers);
        this.config = config;
    }
}
exports.AxiosHelper = AxiosHelper;
//# sourceMappingURL=axios.helper.js.map
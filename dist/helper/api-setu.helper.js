"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiSetuHelper = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const helper_1 = require("./");
const utils_1 = require("../utils");
const API_VERIFY_PAN = '/verify/pan';
const API_VERIFY_GST = '/verify/gst';
const API_OKYC_REQUEST_ID = '/okyc';
const apiGetCaptcha = (requestId) => `/okyc/${requestId}/initiate`;
const apiAadhaarOtp = (requestId) => `/okyc/${requestId}/verify`;
const apiVerifyAadhaarOtp = (requestId) => `/okyc/${requestId}/complete`;
const apiOkycDetail = (requestId, shareCode) => `/okyc/${requestId}/${shareCode}`;
class ApiSetuHelper {
    constructor(prisma, user) {
        this.prisma = prisma;
        this.user = user;
        this.getPanHeader = () => ({
            'x-product-instance-id': process.env.KYC_API_SETU_PAN_PRODUCT_INSTANCE_ID,
        });
        this.getOKycHeader = () => ({
            'x-product-instance-id': process.env.KYC_API_SETU_OKYC_PRODUCT_INSTANCE_ID,
        });
        this.getGSTHeader = () => ({
            'x-product-instance-id': process.env.KYC_API_SETU_GST_PRODUCT_INSTANCE_ID,
        });
        this.getRequest = async (url, headers) => {
            const response = await this.axiosHelper.getRequest(url, headers);
            return { result: response?.data, ...response };
        };
        this.postRequest = async (url, data, headers) => {
            const response = await this.axiosHelper.postRequest(url, data, headers);
            return { result: response?.data, ...response };
        };
        this.verifyPan = async (body) => {
            const { result, errorData, response } = await this.postRequest(API_VERIFY_PAN, body, this.getPanHeader());
            if (result?.data) {
                const { id, data } = result;
                const { consent, pan } = body;
                const { user_id } = this.user;
                const userData = await this.prisma.user.findUnique({
                    where: { user_id },
                    select: {
                        kyc_details: {
                            where: { type: client_1.EnumIdType.PAN },
                            select: { kyc_id: true, type: true },
                        },
                    },
                });
                let kyc_id = '';
                if (userData?.kyc_details?.[0]?.type === client_1.EnumIdType.PAN) {
                    kyc_id = userData.kyc_details[0].kyc_id;
                }
                const user = await this.prisma.user.update({
                    where: { user_id },
                    data: {
                        kyc_details: {
                            upsert: {
                                where: { kyc_id },
                                create: {
                                    request_id: id,
                                    kyc_number: pan,
                                    pan_first_name: data.first_name || undefined,
                                    type: utils_1.KycIdType.PAN,
                                    consent: consent ? true : undefined,
                                    is_verified: true,
                                },
                                update: {
                                    request_id: id,
                                    kyc_number: pan,
                                    pan_first_name: data.first_name || undefined,
                                    type: utils_1.KycIdType.PAN,
                                    consent: consent ? true : undefined,
                                    is_verified: true,
                                },
                            },
                        },
                    },
                    select: {
                        user_id: true,
                        first_name: true,
                        last_name: true,
                        business_name: true,
                        business_type: true,
                        email: true,
                        phone_no: true,
                        address_line_1: true,
                        address_line_2: true,
                        account_no: true,
                        account_type: true,
                        kyc_details: true,
                        country: {
                            select: {
                                country_name: true,
                                iso2: true,
                                iso3: true,
                                currency: true,
                                country_id: true,
                                currency_symbol: true,
                                emoji: true,
                                emojiU: true,
                                bankInputs: true,
                            },
                        },
                        state: {
                            select: {
                                state_id: true,
                                state_name: true,
                            },
                        },
                        city: { select: { city_id: true, city_name: true } },
                        zip_code: true,
                        status: true,
                    },
                });
                user.status = 'Pending';
                return { user, result };
            }
            else
                throw new common_1.BadRequestException(result?.message ||
                    errorData?.error?.detail ||
                    'Please try again! Pan verification failed!');
        };
        this.verifyGST = async (body) => {
            const { result, errorData } = await this.postRequest(API_VERIFY_GST, body, this.getGSTHeader());
            if (result?.data?.gst) {
                const { gstin } = body;
                const { requestId } = result;
                const { user_id } = this.user;
                await this.prisma.user.update({
                    where: { user_id },
                    data: {
                        kyc_details: {
                            create: {
                                request_id: requestId,
                                type: utils_1.KycIdType.GST,
                                kyc_number: gstin,
                            },
                        },
                    },
                });
                return result;
            }
            else
                throw new common_1.BadRequestException(result?.message ||
                    errorData?.error?.detail ||
                    'Please try again! GST verification failed!');
        };
        this.generateAadhaarCaptcha = async (requestId) => {
            const { result, errorData } = await this.getRequest(apiGetCaptcha(requestId), this.getOKycHeader());
            if (result?.captchaImage)
                return result;
            else
                throw new common_1.BadRequestException(errorData?.error?.detail ||
                    'Please try again! Something went wrong while generating Recaptcha!');
        };
        this.initiateRecaptcha = async (body) => {
            const { result: requestResult, errorData } = await this.postRequest(API_OKYC_REQUEST_ID, body, this.getOKycHeader());
            if (requestResult?.id) {
                const { id: requestId } = requestResult;
                const { user_id } = this.user;
                const { kyc_details } = await this.prisma.user.findUnique({
                    where: { user_id },
                    include: { kyc_details: true },
                });
                const { kyc_id = '' } = kyc_details?.find(({ type }) => type === utils_1.KycIdType.AADHAR) || {};
                const user = await this.prisma.user.update({
                    where: { user_id },
                    data: {
                        kyc_details: {
                            upsert: {
                                where: { kyc_id },
                                update: {
                                    request_id: requestId,
                                },
                                create: {
                                    request_id: requestId,
                                    type: utils_1.KycIdType.AADHAR,
                                },
                            },
                        },
                    },
                    select: {
                        user_id: true,
                        first_name: true,
                        last_name: true,
                        business_name: true,
                        business_type: true,
                        email: true,
                        phone_no: true,
                        address_line_1: true,
                        address_line_2: true,
                        account_no: true,
                        account_type: true,
                        kyc_details: true,
                        country: {
                            select: {
                                country_name: true,
                                iso2: true,
                                iso3: true,
                                currency: true,
                                country_id: true,
                                currency_symbol: true,
                                emoji: true,
                                emojiU: true,
                                bankInputs: true,
                            },
                        },
                        state: {
                            select: {
                                state_id: true,
                                state_name: true,
                            },
                        },
                        city: { select: { city_id: true, city_name: true } },
                        zip_code: true,
                        status: true,
                    },
                });
                if (!user) {
                    throw new common_1.BadRequestException('Something went wrong');
                }
                user.status = 'Pending';
                const captcha = await this.generateAadhaarCaptcha(requestId);
                return {
                    user,
                    captcha,
                };
            }
            else
                throw new common_1.BadRequestException(errorData?.error?.detail ||
                    'Please try again! Something went wrong while generating Recaptcha!');
        };
        this.regenerateCaptcha = async () => {
            const { user_id } = this.user;
            const user = await this.prisma.user.findUnique({
                where: { user_id },
                include: { kyc_details: true },
            });
            const { kyc_details } = user;
            const { request_id } = kyc_details?.find(({ type }) => type === utils_1.KycIdType.AADHAR) || {};
            if (!request_id)
                throw new common_1.NotFoundException('kyc detail not found');
            const captcha = await this.generateAadhaarCaptcha(request_id);
            return { user, captcha };
        };
        this.generateAadhaarOtp = async (body) => {
            const { user_id } = this.user;
            const user = await this.prisma.user.findUnique({
                where: { user_id },
                include: { kyc_details: true },
            });
            const { kyc_details } = user;
            const { kyc_id = '', request_id } = kyc_details?.find(({ type }) => type === utils_1.KycIdType.AADHAR) || {};
            if (!kyc_id)
                throw new common_1.NotFoundException('kyc_id not found');
            if (!request_id)
                throw new common_1.BadRequestException('Please verify Aadhar captcha again');
            const { result, errorData } = await this.postRequest(apiAadhaarOtp(request_id), body, this.getOKycHeader());
            if (result?.code === 'otp_sent')
                return { user, otp: result };
            else
                throw new common_1.BadRequestException(result?.message ||
                    errorData?.error?.detail ||
                    'Please try again! Failed to generate Aadhaar OTP!');
        };
        this.verifyAadhaarOtp = async (body) => {
            const { user_id } = this.user;
            const { kyc_details } = await this.prisma.user.findUnique({
                where: { user_id },
                include: { kyc_details: true },
            });
            const { kyc_id = '', request_id } = kyc_details?.find(({ type }) => type === utils_1.KycIdType.AADHAR) || {};
            if (!kyc_details.length)
                throw new common_1.NotFoundException('kyc_id not found');
            if (!request_id)
                throw new common_1.BadRequestException('Please verify Aadhar captcha again');
            const { result, errorData } = await this.postRequest(apiVerifyAadhaarOtp(request_id), body, this.getOKycHeader());
            if (result?.aadhaar) {
                const { aadhaarNumber, shareCode } = body;
                const { id, aadhaar } = result;
                const { user_id } = this.user;
                let formatted_date;
                if (aadhaar.dateOfBirth) {
                    const [day, month, year] = aadhaar.dateOfBirth.split('-');
                    formatted_date = new Date(`${year}-${month}-${day}`);
                }
                const user = await this.prisma.user.update({
                    where: { user_id },
                    data: {
                        kyc_details: {
                            update: {
                                where: { kyc_id },
                                data: {
                                    share_code: shareCode,
                                    kyc_number: aadhaarNumber,
                                    is_verified: true,
                                    aadhaar_name: aadhaar.name || undefined,
                                    aadhaar_date_of_birth: formatted_date || undefined,
                                },
                            },
                        },
                    },
                    select: {
                        user_id: true,
                        first_name: true,
                        last_name: true,
                        business_name: true,
                        business_type: true,
                        email: true,
                        phone_no: true,
                        address_line_1: true,
                        address_line_2: true,
                        account_no: true,
                        account_type: true,
                        kyc_details: true,
                        country: {
                            select: {
                                country_name: true,
                                iso2: true,
                                iso3: true,
                                currency: true,
                                country_id: true,
                                currency_symbol: true,
                                emoji: true,
                                emojiU: true,
                                bankInputs: true,
                            },
                        },
                        state: {
                            select: {
                                state_id: true,
                                state_name: true,
                            },
                        },
                        city: { select: { city_id: true, city_name: true } },
                        zip_code: true,
                        status: true,
                    },
                });
                user.status = 'Pending';
                return { user, result };
            }
            else
                throw new common_1.BadRequestException(errorData?.error?.detail ||
                    'Please try again! Aadhar OTP verification failed!');
        };
        this.getOKycDetails = async () => {
            const { kyc_request_id, id_type, kyc_share_code } = this.user;
            if (!kyc_request_id || id_type !== 'Aadhaar')
                throw new common_1.BadRequestException('This is not valid done through Aadhaar KYC');
            const { result, errorData } = await this.getRequest(apiOkycDetail(kyc_request_id, kyc_share_code), this.getOKycHeader());
            if (result?.aadhaar)
                return result;
            else
                throw new common_1.BadRequestException(errorData?.error?.detail ||
                    'Please try again! Aadhar OTP verification failed!');
        };
        this.axiosHelper = new helper_1.AxiosHelper({
            baseUrl: process.env.KYC_API_SETU_URL,
            headers: {
                'x-client-id': process.env.KYC_API_SETU_CLIENT_ID,
                'x-client-secret': process.env.KYC_API_SETU_CLIENT_SECRET,
            },
            interceptRequest: (config) => {
                return config;
            },
            interceptResponse: (response) => response,
            interceptErrorResponse: (error) => error,
        });
    }
}
exports.ApiSetuHelper = ApiSetuHelper;
//# sourceMappingURL=api-setu.helper.js.map
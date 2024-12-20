import { TypeMime, TypeVisaProductCode } from 'utils';

export type JSONValues = string | string[] | number | boolean | Date;

export type JSONObject<T = JSONValues | Record<string, JSONValues>> = Record<
  string,
  T
>;

export interface IRequest {
  headers: IHeader;
  body: IRequestBody;
  user: IUser;
}

export interface IHeader {
  authorization: string;
}

export interface IRequestBody<B> {
  body: B;
}

export interface IUser {
  user_id: string;
  role: string;
}

export interface ITokenPayload {
  user_id: string;
  iat: number;
  exp: number;
  isUserUpdated: boolean;
}

export interface ISettlement {
  currency_code: string;
  amount: string;
  conversion_rate: string;
}

export interface IAcquirerDetail {
  settlement: ISettlement;
}

export interface IFileInput {
  originalname: string;
  size: number;
  mimetype: string;
  buffer: Buffer;
  encoding: string;
  fieldname: string;
}

export interface IFile {
  attachment_id?: string;
  file_name: string;
  original_name: string;
  mime: TypeMime;
}

export interface IBodyRecipientKyc {
  kyc: IFileInput[];
  transaction_id: string;
  recipient_id: string;
}

export interface IBodySenderKyc {
  kyc: IFileInput[];
  kyc_id: string;
}

export interface IBodyInvoice {
  invoice: IFileInput[];
}

export interface IPayloadVisaFxRate {
  rateProductCode: TypeVisaProductCode;
  sourceCurrencyCode: string;
  destinationCurrencyCode: string;
  initiatingPartyId: number;
  quoteIdRequired: boolean;
}

export interface IResponseVisaRate {
  conversionRate: number;
  rateProductCode: TypeVisaProductCode;
  sourceCurrencyCode: string;
  destinationCurrencyCode: string;
  quoteId: number;
  quoteIdExpiryDateTime: string;
}

export interface ISignUp {
  phone_number: string;
}

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelPymentVisaHelper = exports.visaPayoutServices = exports.visaFxRatePopularCorridors = exports.visaFxRateConversion = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const axios_1 = __importDefault(require("axios"));
const fs = __importStar(require("fs"));
const https = __importStar(require("https"));
const nodeJose = __importStar(require("node-jose"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("../utils");
async function visaFxRateConversion({ source_amount, destination_amount, source_country_code, destination_country_code, }) {
    try {
        const prisma = new client_1.PrismaClient();
        const { VISA_KEY: key, VISA_CERTIFICATE: cert, VISA_BASE_URL: baseUrl, VISA_USER_ID, VISA_PASSWORD, } = process.env;
        const source_country = await prisma.country.findUnique({
            where: { iso2: source_country_code, is_active: true },
        });
        const destination_country = await prisma.country.findUnique({
            where: { iso2: destination_country_code, is_active: true },
        });
        if (!source_amount && !destination_amount)
            throw new common_1.BadRequestException('Please enter valid amount');
        if (!source_country || !destination_country)
            throw new common_1.BadRequestException('source_country or destination_country not found');
        if (!utils_1.CurrencyCodes[source_country.currency] ||
            !utils_1.CurrencyCodes[destination_country.currency])
            throw new common_1.BadRequestException('Currency does not match with source_country or destination_country codes');
        const product_code = utils_1.ProductCodes.BANK;
        if (!utils_1.ProductCodes[product_code])
            throw new common_1.NotFoundException('Product code not found');
        const httpsAgent = new https.Agent({ key, cert });
        const data = {
            rateProductCode: product_code,
            sourceCurrencyCode: source_country.currency,
            destinationCurrencyCode: destination_country.currency,
            initiatingPartyId: 1002,
            quoteIdRequired: true,
        };
        const url = `${baseUrl}/forexrates/v2/foreignexchangerates`;
        const response = await axios_1.default.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Basic ' +
                    Buffer.from(VISA_USER_ID + ':' + VISA_PASSWORD).toString('base64'),
            },
            httpsAgent: httpsAgent,
        });
        const responseData = response.data;
        if (responseData.error)
            throw new common_1.BadRequestException(responseData.error.info, responseData.error.code);
        const { conversionRate, quoteId } = response.data;
        let destinationAmount = destination_amount
            ? parseFloat(destination_amount)
            : 0;
        let sourceAmount = source_amount ? parseFloat(source_amount) : 0;
        sourceAmount = destination_amount
            ? destinationAmount / conversionRate
            : sourceAmount;
        destinationAmount = destination_amount
            ? destinationAmount
            : sourceAmount * conversionRate;
        const result = {
            conversion_rate: conversionRate.toFixed(2),
            source_amount: sourceAmount?.toFixed(2),
            destination_amount: destinationAmount?.toFixed(2),
            quote_id: quoteId,
        };
        return result;
    }
    catch (error) {
        (0, utils_1.printLog)(error.response?.data || error.response || error);
        throw new common_1.BadRequestException(error.response?.data, error.code);
    }
}
exports.visaFxRateConversion = visaFxRateConversion;
async function visaFxRatePopularCorridors() {
    const prisma = new client_1.PrismaClient();
    const { VISA_KEY: key, VISA_CERTIFICATE: cert, VISA_BASE_URL: baseUrl, VISA_USER_ID, VISA_PASSWORD, } = process.env;
    const httpsAgent = new https.Agent({ key, cert });
    const result = [];
    const sourceCountries = ['USD', 'JPY', 'SGD', 'EUR', 'AUD', 'AED', 'CNY'];
    const destinationCurrency = 'INR';
    const destinationCountry = await prisma.country.findFirst({
        where: { currency: destinationCurrency, is_active: true },
    });
    const product_code = utils_1.ProductCodes.BANK;
    const promises = sourceCountries.map(async (sourceCurrency) => {
        const sourceCountry = await prisma.country.findFirst({
            where: { currency: sourceCurrency, is_active: true },
        });
        const data = {
            rateProductCode: product_code,
            sourceCurrencyCode: sourceCurrency,
            destinationCurrencyCode: destinationCurrency,
            initiatingPartyId: 1002,
            quoteIdRequired: true,
        };
        const url = `${baseUrl}/forexrates/v2/foreignexchangerates`;
        try {
            const response = await axios_1.default.post(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: 'Basic ' +
                        Buffer.from(VISA_USER_ID + ':' + VISA_PASSWORD).toString('base64'),
                },
                httpsAgent: httpsAgent,
            });
            const { conversionRate, quoteId } = response.data;
            result.push({
                source_country: sourceCountry || null,
                destination_country: destinationCountry || null,
                conversion_rate: conversionRate,
                quote_id: quoteId,
            });
        }
        catch (error) {
            console.log({
                error: `API Request Failed:${error.response?.data || error.message}`,
                timestamp: new Date(),
            });
            throw new common_1.BadRequestException(error.response?.data || error.message, error.code);
        }
    });
    await Promise.all(promises);
    return result;
}
exports.visaFxRatePopularCorridors = visaFxRatePopularCorridors;
async function encryptPayload(payload, credentials) {
    try {
        const publicKey = fs.readFileSync(credentials.clientEncryptionCert, 'utf8');
        const key = await nodeJose.JWK.asKey(publicKey, 'pem', {
            kty: 'RSA',
            alg: 'RSA-OAEP-256',
            enc: 'A128GCM',
            key_opts: ['wrapKey', 'enc'],
            kid: credentials.encryptionKey,
        });
        console.log(payload, '<<<<<<<< payload in enc');
        const result = await nodeJose.JWE.createEncrypt({
            format: 'compact',
            contentAlg: 'A128GCM',
            fields: { iat: Date.now() },
        }, key)
            .update(JSON.stringify(payload))
            .final();
        const encryptedData = { encData: result };
        console.log(`Encrypted Response: ${JSON.stringify(encryptedData)}`);
        return encryptedData;
    }
    catch (error) {
        console.error('Encryption failed:', error);
    }
}
async function decryptResponse(encryptedPayloadString, credentials) {
    try {
        const encryptedPayload = typeof encryptedPayloadString === 'string'
            ? JSON.parse(encryptedPayloadString)
            : encryptedPayloadString;
        const keystore = nodeJose.JWK.createKeyStore();
        const decProps = {
            kid: credentials.encryptionKey,
            alg: 'RSA-OAEP-256',
            enc: 'A128GCM',
        };
        const decryptionKey = fs.readFileSync(credentials.privateKey, 'utf8');
        const key = await keystore.add(decryptionKey, 'pem', decProps);
        const result = await nodeJose.JWE.createDecrypt(key).decrypt(encryptedPayload.encData);
        return result.plaintext.toString();
    }
    catch (error) {
        console.error('Decryption error:', error);
        throw new common_1.BadRequestException('Invalid payment');
    }
}
async function visaPayoutServices(transaction_id) {
    const { VISA_USER_ID, VISA_PASSWORD, VISA_KEY, VISA_CERTIFICATE, VISA_BASE_URL, VISA_ENCRYPTIONK_KEY, } = process.env;
    const httpsAgent = new https.Agent({
        key: VISA_KEY,
        cert: VISA_CERTIFICATE,
        keepAlive: true,
    });
    const clientEncryptionCert = path_1.default.join(process.cwd(), 'src', 'helper', 'secret', 'visa', 'client_cert_12974116-cbe2-46cc-bc8d-f53b9a73598b.pem');
    const privateKey = path_1.default.join(process.cwd(), 'src', 'helper', 'secret', 'visa', 'CSR_Key_My.pem');
    const credentials = {
        encryptionKey: VISA_ENCRYPTIONK_KEY,
        clientEncryptionCert,
        privateKey,
    };
    const prisma = new client_1.PrismaClient();
    const transaction = await prisma.transaction.findUnique({
        where: { transaction_id },
        include: {
            created_by: { include: { country: true, city: true, state: true } },
            recipient: {
                include: { bank_account: true, country: true, city: true, state: true },
            },
        },
    });
    if (!transaction) {
        throw new common_1.NotFoundException('Transaction not found');
    }
    const payload = {
        payoutMethod: 'B',
        recipientDetail: {
            contactEmail: transaction.recipient.email,
            contactNumber: transaction.recipient.phone_no,
            bank: {
                accountName: transaction.recipient.bank_account.account_holder,
                accountNumber: transaction.recipient.bank_account.account_no,
                accountNumberType: transaction.recipient.bank_account.bank_code_type ===
                    client_1.EnumBankCodeType.IBAN
                    ? client_1.EnumBankCodeType.IBAN
                    : 'DEFAULT',
                countryCode: transaction.recipient.country.iso3,
                currencyCode: transaction.recipient.country.currency,
                bankCode: transaction.recipient.bank_account.branch_code,
                bankCodeType: 'DEFAULT',
                bankName: transaction.recipient.bank_account.bank_name || undefined,
            },
            address: {
                addressLine1: transaction.recipient.address_line_1,
                addressLine2: transaction.recipient.address_line_2 || undefined,
                city: transaction.recipient.city.city_name,
                country: transaction.recipient.country.iso3,
                postalCode: transaction.recipient.zip_code,
                state: transaction.recipient.state.state_name,
            },
            type: transaction.recipient_account_type === utils_1.AccountType.INDIVIDUAL
                ? 'I'
                : 'C',
        },
        senderDetail: {
            contactEmail: transaction.created_by.email,
            contactNumber: transaction.created_by.phone_no,
            address: {
                addressLine1: transaction.created_by.address_line_1,
                addressLine2: transaction.created_by.address_line_2 || undefined,
                city: transaction.created_by.city.city_name,
                country: transaction.created_by.country.iso3,
            },
            type: transaction.sender_account_type === utils_1.AccountType.INDIVIDUAL ? 'I' : 'C',
            senderAccountNumber: 'senderAccountNumber',
        },
        transactionDetail: {
            businessApplicationId: 'FD',
            clientReferenceId: '888852397088',
            initiatingPartyId: 1002,
            transactionAmount: transaction.destination_amount,
            transactionCurrencyCode: transaction.recipient.country.currency,
            quoteId: transaction.visa_quote_id,
            settlementCurrencyCode: transaction.recipient.country.currency,
        },
    };
    if (transaction.created_by.account_type === utils_1.AccountType.INDIVIDUAL &&
        transaction.recipient.recipient_account_type === utils_1.AccountType.BUSINESS) {
        payload.senderDetail.firstName = transaction.created_by.first_name;
        payload.senderDetail.lastName =
            transaction.created_by.last_name || undefined;
        payload.recipientDetail.name = transaction.recipient.business_name;
    }
    else if (transaction.created_by.account_type === utils_1.AccountType.BUSINESS &&
        transaction.recipient.recipient_account_type === utils_1.AccountType.INDIVIDUAL) {
        payload.senderDetail.name = transaction.created_by.business_name;
        payload.recipientDetail.firstName = transaction.recipient.first_name;
        payload.recipientDetail.lastName = transaction.recipient.last_name;
    }
    else if (transaction.created_by.account_type === utils_1.AccountType.INDIVIDUAL &&
        transaction.recipient.recipient_account_type === utils_1.AccountType.INDIVIDUAL) {
        payload.senderDetail.firstName = transaction.created_by.first_name;
        payload.senderDetail.lastName =
            transaction.created_by.last_name || undefined;
        payload.recipientDetail.firstName = transaction.recipient.first_name;
        payload.recipientDetail.lastName = transaction.recipient.last_name;
    }
    else if (transaction.created_by.account_type === utils_1.AccountType.BUSINESS &&
        transaction.recipient.recipient_account_type === utils_1.AccountType.BUSINESS) {
        payload.senderDetail.name = transaction.created_by.business_name;
        payload.recipientDetail.name = transaction.recipient.business_name;
    }
    console.log({
        'visa payout payload >>>': payload,
    });
    const data = await encryptPayload(payload, credentials);
    console.log('encryptedPayload', data);
    const authHeader = {
        hostname: 'sandbox.api.visa.com',
        port: 443,
        method: 'post',
        url: `${VISA_BASE_URL}/visapayouts/v3/payouts`,
        httpsAgent: httpsAgent,
        auth: {
            username: VISA_USER_ID,
            password: VISA_PASSWORD,
        },
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            keyId: '12974116-cbe2-46cc-bc8d-f53b9a73598b',
            Authorization: 'Basic ' +
                Buffer.from(VISA_USER_ID + ':' + VISA_PASSWORD).toString('base64'),
        },
        data,
        json: true,
    };
    try {
        const response = await (0, axios_1.default)(authHeader);
        if (!response)
            throw new common_1.BadRequestException('INVALID PAYMENT');
        console.log(response, '>>>>>>> payout response');
        const decryptedResponse = await decryptResponse(response.data, credentials);
        return decryptedResponse;
    }
    catch (error) {
        console.log({
            error: error.response.data,
            timestamp: new Date(),
        });
        throw new common_1.BadRequestException('INVALID PAYMENT');
    }
}
exports.visaPayoutServices = visaPayoutServices;
async function cancelPymentVisaHelper(order_id) {
    const { VISA_USER_ID, VISA_PASSWORD, VISA_KEY, VISA_CERTIFICATE, VISA_PAYOUT_URL, } = process.env;
    const httpsAgent = new https.Agent({
        key: VISA_KEY,
        cert: VISA_CERTIFICATE,
        keepAlive: true,
    });
    const prisma = new client_1.PrismaClient();
    const order = await prisma.order.findUnique({
        where: { order_id },
    });
    if (!order) {
        console.log({
            error: 'Order not found',
            timestamp: new Date(),
        });
        throw new common_1.NotFoundException('Order not found');
    }
    const { initiating_party_id, payout_id } = order;
    const config = {
        method: 'delete',
        url: VISA_PAYOUT_URL,
        httpsAgent: httpsAgent,
        auth: {
            username: VISA_USER_ID,
            password: VISA_PASSWORD,
        },
        headers: {
            'Content-Type': 'application/json',
        },
        params: {
            id: payout_id,
            idType: 'PAYOUT_ID',
            initiatingPartyId: initiating_party_id,
        },
    };
    try {
        const response = await (0, axios_1.default)(config);
        if (!response)
            throw new common_1.BadRequestException('INVALID CANCEL PAYMENT');
        return response;
    }
    catch (error) {
        console.log({
            error: 'Cancel Payment Error',
            timestamp: new Date(),
        });
        throw new common_1.BadRequestException('Cancel Payment Error');
    }
}
exports.cancelPymentVisaHelper = cancelPymentVisaHelper;
//# sourceMappingURL=visa.helper.js.map
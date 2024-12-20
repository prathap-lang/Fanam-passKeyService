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
exports.masterCardWebhookdecrypt = exports.masterCardPayout = exports.masterCardQuoteConfirmation = exports.masterCardCurrencyConvertor = exports.authorizationHeader = exports.onResult = exports.decryptResponse = exports.encryptPayload = exports.masterCardQuote = exports.signInProvider = exports.getEncryptionConfig = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const axios_1 = __importDefault(require("axios"));
const fs = __importStar(require("fs"));
const mastercard_client_encryption_1 = require("mastercard-client-encryption");
const mastercard_oauth1_signer_1 = __importDefault(require("mastercard-oauth1-signer"));
const node_forge_1 = __importDefault(require("node-forge"));
const path = __importStar(require("path"));
const utils_1 = require("../utils");
const common_const_1 = require("../utils/common.const");
const uuid_1 = require("uuid");
async function getEncryptionConfig(encryptionPath, privateKeyPath) {
    const config = {
        paths: [
            {
                path: '/resource1',
                toEncrypt: [{ element: '$', obj: 'encrypted_payload' }],
                toDecrypt: [{ element: 'encrypted_payload', obj: '$' }],
            },
        ],
        mode: 'JWE',
        encryptedValueFieldName: 'data',
        encryptionCertificate: path.join(__dirname, encryptionPath),
        privateKey: path.join(__dirname, privateKeyPath),
    };
    return config;
}
exports.getEncryptionConfig = getEncryptionConfig;
async function signInProvider(signingPath) {
    try {
        const p12Content = fs.readFileSync(path.join(__dirname, signingPath), 'binary');
        const p12Asn1 = node_forge_1.default.asn1.fromDer(p12Content, false);
        const p12 = node_forge_1.default.pkcs12.pkcs12FromAsn1(p12Asn1, false, process.env.MASTER_CARD_ALIAS);
        const keyObj = p12.getBags({
            friendlyName: process.env.MASTER_CARD_KEY,
            bagType: node_forge_1.default.pki.oids.pkcs8ShroudedKeyBag,
        }).friendlyName[0];
        const signingKey = node_forge_1.default.pki.privateKeyToPem(keyObj.key);
        return signingKey;
    }
    catch (error) {
        console.log('signInProvider error:', error);
    }
}
exports.signInProvider = signInProvider;
async function masterCardQuote(transaction_id) {
    const prisma = new client_1.PrismaClient();
    const transaction = await prisma.transaction.findUnique({
        where: { transaction_id },
        include: {
            recipient: { select: { recipient_account_type: true } },
            created_by: { select: { account_type: true } },
            source_country: { select: { currency: true, iso3: true } },
            destination_country: { select: { currency: true, iso3: true } },
        },
    });
    if (!transaction) {
        throw new common_1.NotFoundException('Transaction not found');
    }
    let paymentType;
    if (transaction.created_by.account_type === utils_1.AccountType.INDIVIDUAL &&
        transaction.recipient.recipient_account_type === utils_1.AccountType.BUSINESS) {
        paymentType = 'P2B';
    }
    else if (transaction.created_by.account_type === utils_1.AccountType.BUSINESS &&
        transaction.recipient.recipient_account_type === utils_1.AccountType.INDIVIDUAL) {
        paymentType = 'B2P';
    }
    else if (transaction.created_by.account_type === utils_1.AccountType.INDIVIDUAL &&
        transaction.recipient.recipient_account_type === utils_1.AccountType.INDIVIDUAL) {
        paymentType = 'P2P';
    }
    else if (transaction.created_by.account_type === utils_1.AccountType.BUSINESS &&
        transaction.recipient.recipient_account_type === utils_1.AccountType.BUSINESS) {
        paymentType = 'B2B';
    }
    const payload = {
        quoterequest: {
            transaction_reference: (0, uuid_1.v1)(),
            payment_amount: {
                amount: transaction.destination_amount,
                currency: transaction.destination_country.currency,
            },
            payment_origination_country: transaction.source_country.iso3,
            payment_type: paymentType,
            quote_type: {
                forward: {
                    receiver_currency: transaction.destination_country.currency,
                },
                reverse: {
                    sender_currency: transaction.source_country.currency,
                },
            },
        },
    };
    console.log({ 'mastercard quotes payload >>>': payload });
    const signingKey = await signInProvider('../../src/helper/secret/master-card/fanam-sandbox-signing.p12');
    const encryptionPath = '../../src/helper/secret/master-card/mastercard-cross-border-services-ClientEnc1726060528257.pem';
    const decryptionPrivateKeyPath = '../../src/helper/secret/master-card/enckey.der';
    const config = await getEncryptionConfig(encryptionPath, decryptionPrivateKeyPath);
    const data = await encryptPayload(payload, config);
    const url = `${process.env.MASTER_CARD_BASE_URL}/send/v1/partners/BEL_MASEND5ged2/crossborder/quotes`;
    const authHeader = await authorizationHeader(url, common_const_1.POST, data, process.env.MASTER_CARD_PAYOUT_CONSUMER_KEY, signingKey);
    try {
        const response = await axios_1.default.post(url, data, {
            headers: {
                Authorization: authHeader,
                'Content-Type': 'application/json',
                'Content-Length': data.length,
                'x-encrypted': true,
            },
        });
        if (response?.data) {
            return await decryptResponse(response.data, config);
        }
    }
    catch (error) {
        throw new common_1.BadRequestException(error?.response?.data?.Errors?.Error ||
            error?.response ||
            'something went wrong');
    }
}
exports.masterCardQuote = masterCardQuote;
async function encryptPayload(payload, config) {
    try {
        const jwe = new mastercard_client_encryption_1.JweEncryption(config);
        const header = {};
        const encryptedPayload = jwe.encrypt('/resource1', header, payload);
        const data = JSON.stringify(encryptedPayload.body);
        return data;
    }
    catch (error) {
        console.log('encrypt error:', error);
    }
}
exports.encryptPayload = encryptPayload;
async function decryptResponse(response, config) {
    try {
        const jwe = new mastercard_client_encryption_1.JweEncryption(config);
        return onResult(response, jwe);
    }
    catch (error) {
        console.log('decrypt error:', error);
    }
}
exports.decryptResponse = decryptResponse;
async function onResult(d, jwe) {
    try {
        const response = {
            request: { url: '/resource1' },
            body: d,
        };
        const decryptedPayload = jwe.decrypt(response);
        return decryptedPayload;
    }
    catch (error) {
        console.log({
            error: 'Error decrypting payload',
            timestamp: new Date(),
        });
        throw new common_1.HttpException('Error decrypting payload', 500);
    }
}
exports.onResult = onResult;
async function authorizationHeader(url, method, data, consumerKey, signingKey) {
    const authHeader = mastercard_oauth1_signer_1.default.getAuthorizationHeader(url, method, data, consumerKey, signingKey);
    return authHeader;
}
exports.authorizationHeader = authorizationHeader;
async function masterCardCurrencyConvertor({ source_amount, destination_amount, source_country_code, destination_country_code, }) {
    const prisma = new client_1.PrismaClient();
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
    const currentDate = new Date();
    const yesterdayTimestamp = currentDate.setDate(currentDate.getDate() - 1);
    const yesterdayDate = new Date(yesterdayTimestamp);
    const formattedYesterday = yesterdayDate.toISOString().split('T')[0];
    const signingKey = await signInProvider('../../src/helper/secret/master-card/Currency-sandbox-signing.p12');
    const url = `${process.env.MASTER_CARD_BASE_URL}/enhanced/settlement/currencyrate/subscribed/summary-rates?rate_date=${formattedYesterday}&trans_curr=${destination_country.currency}&trans_amt=${'1'}&crdhld_bill_curr=${source_country.currency}`;
    const authHeader = await authorizationHeader(url, common_const_1.GET, '', process.env.MASTER_CARD_CONVERSION_CONSUMER_KEY, signingKey);
    try {
        const response = await axios_1.default.get(url, {
            headers: {
                Authorization: authHeader,
                'Content-Type': 'application/json',
                'x-encrypted': true,
            },
        });
        const responseData = response.data?.data;
        if (responseData.Errors)
            throw new common_1.BadRequestException(responseData.error.info, responseData.error.code);
        const sourceAmount = destination_amount
            ? parseFloat(destination_amount) * responseData.effectiveConversionRate
            : parseFloat(source_amount);
        const destinationAmount = destination_amount
            ? parseFloat(destination_amount)
            : parseFloat(source_amount) / responseData.effectiveConversionRate;
        return {
            conversion_rate: parseFloat(responseData.effectiveConversionRate).toFixed(2),
            source_amount: sourceAmount?.toFixed(2),
            destination_amount: destinationAmount?.toFixed(2),
        };
    }
    catch (error) {
        console.error('Error sending request:', error);
        throw error;
    }
}
exports.masterCardCurrencyConvertor = masterCardCurrencyConvertor;
async function masterCardQuoteConfirmation(transaction_id, razorpayService, pdf, log) {
    const prisma = new client_1.PrismaClient();
    const transaction = await prisma.transaction.findUnique({
        where: { transaction_id },
        select: {
            transaction_id: true,
            recipient: { select: { is_send_email: true } },
            master_card_proposal_id: true,
            master_card_transaction_id: true,
            order: true,
        },
    });
    if (!transaction) {
        throw new common_1.NotFoundException('Transaction not found');
    }
    if (!transaction.order) {
        throw new common_1.NotFoundException('Order not found in transaction');
    }
    const payload = {
        transactionReference: transaction.master_card_transaction_id,
        proposalId: transaction.master_card_proposal_id,
    };
    console.log({ 'mastercard quote confirmation payload >>>': payload });
    const signingKey = await signInProvider('../../src/helper/secret/master-card/fanam-sandbox-signing.p12');
    const encryptionPath = '../../src/helper/secret/master-card/mastercard-cross-border-services-ClientEnc1726060528257.pem';
    const decryptionPrivateKeyPath = '../../src/helper/secret/master-card/enckey.der';
    const config = await getEncryptionConfig(encryptionPath, decryptionPrivateKeyPath);
    const data = await encryptPayload(payload, config);
    const url = `${process.env.MASTER_CARD_BASE_URL}/send/partners/BEL_MASEND5ged2/crossborder/quotes/confirmations`;
    const authHeader = await authorizationHeader(url, common_const_1.POST, data, process.env.MASTER_CARD_PAYOUT_CONSUMER_KEY, signingKey);
    try {
        const response = await axios_1.default.post(url, data, {
            headers: {
                Authorization: authHeader,
                'Content-Type': 'application/json',
                'Content-Length': data.length,
                'x-encrypted': true,
            },
        });
        if (response?.data) {
            const result = await decryptResponse(response.data, config);
            if (result.status) {
                const result = await masterCardPayout(transaction_id);
                if (result.payment) {
                    console.log(result.payment, '<<<<<<<<<<<< payout response');
                    const updateOrderData = {
                        payout_id: result.payment.id,
                        proposal_id: result.payment.proposal_id,
                        client_reference_id: result.payment.transaction_reference,
                    };
                    let status;
                    switch (result.payment.status) {
                        case utils_1.PaymentWebhookOrderStatus.WEBHOOK_ORDER_MC_SUCCESS:
                            status = utils_1.OrderStatus.TRANSACTION_SUCCESS;
                            break;
                        case utils_1.PaymentWebhookOrderStatus.WEBHOOK_ORDER_MC_PENDING:
                            status = utils_1.OrderStatus.TRANSACTION_PENDING;
                            break;
                        case utils_1.PaymentWebhookOrderStatus.WEBHOOK_ORDER_MC_REJECTED:
                            status = utils_1.OrderStatus.TRANSACTION_REJECTED;
                            break;
                    }
                    updateOrderData.order_status = status;
                    updateOrderData.payment = {
                        update: {
                            status,
                        },
                    };
                    updateOrderData.logs = {
                        create: {
                            status,
                        },
                    };
                    const order = await prisma.order.update({
                        where: {
                            transaction_id,
                        },
                        data: updateOrderData,
                        select: {
                            transaction: {
                                include: {
                                    order: {
                                        select: {
                                            order_id: true,
                                            order_no: true,
                                            amount: true,
                                            razorpay_order_id: true,
                                            order_status: true,
                                            payout_id: true,
                                            client_reference_id: true,
                                            proposal_id: true,
                                            initiating_party_id: true,
                                            fx_conversion_rate: true,
                                            payment_status: true,
                                            payout_speed: true,
                                        },
                                    },
                                },
                            },
                        },
                    });
                    if (order?.transaction.order.order_status ===
                        utils_1.OrderStatus.TRANSACTION_REJECTED) {
                        await razorpayService.automaticCreateRefund(transaction.order.order_id);
                        console.log(`Refund executed automatically for the order-${order.transaction.order.order_id}`);
                    }
                    else if (order?.transaction.order.order_status ===
                        utils_1.OrderStatus.TRANSACTION_SUCCESS &&
                        transaction.recipient.is_send_email) {
                        try {
                            await pdf.generateUserReport(transaction.transaction_id, 'mastercard');
                        }
                        catch (error) {
                            log.logData({
                                error: `something happened wrong while Pdf-Report generation >>>>>>>>>:${error}`,
                                timestamp: new Date(),
                            });
                            throw new common_1.BadRequestException('something happened wrong while Pdf-Report generation');
                        }
                    }
                    delete order.transaction.status;
                    return order.transaction;
                }
            }
        }
    }
    catch (error) {
        console.log({
            error,
            timestamp: new Date(),
        });
        throw new common_1.BadRequestException(error?.response?.data?.Errors?.Error ||
            error?.response ||
            'something went wrong');
    }
}
exports.masterCardQuoteConfirmation = masterCardQuoteConfirmation;
async function masterCardPayout(transaction_id) {
    const prisma = new client_1.PrismaClient();
    const transaction = await prisma.transaction.findUnique({
        where: { transaction_id },
        include: {
            created_by: {
                include: {
                    country: true,
                    city: true,
                    state: true,
                    kyc_details: { where: { type: utils_1.KycIdType.AADHAR } },
                },
            },
            recipient: {
                include: { bank_account: true, country: true, city: true, state: true },
            },
        },
    });
    if (!transaction) {
        console.log({
            error: 'Transaction not found',
            timestamp: new Date(),
        });
        throw new common_1.NotFoundException('Transaction not found');
    }
    const payload = {
        paymentrequest: {
            transaction_reference: transaction.master_card_transaction_id,
            proposal_id: transaction.master_card_proposal_id,
            receiving_bank_name: 'Royal Exchange',
            receiving_bank_branch_name: 'Quad Cities',
            source_of_income: 'Sal',
            sender: {
                nationality: transaction.created_by.country.iso3,
                address: {
                    line1: transaction.created_by.address_line_1,
                    line2: transaction.created_by.address_line_1,
                    city: transaction.created_by.city.city_name,
                    country_subdivision: 'VA',
                    postal_code: transaction.created_by.zip_code,
                    country: transaction.created_by.country.iso3,
                },
                government_ids: {
                    government_id_uri: 'ppn:123456789;expiration-date=2019-05-27;issue-date=2011-07-12;country=USA',
                },
                date_of_birth: '1985-06-24',
            },
            recipient: {
                nationality: 'USA',
                address: {
                    line1: '123MainStreet',
                    line2: '5A',
                    city: 'Arlington',
                    country_subdivision: 'VA',
                    postal_code: '22207',
                    country: 'USA',
                },
                government_ids: {
                    government_id_uri: 'ppn:541235632;expiration-date=2021-05-27;issue-date=2011-07-12;country=USA',
                },
                phone: transaction.recipient.phone_no,
                email: transaction.recipient.email,
            },
        },
    };
    if (transaction.created_by.account_type === utils_1.AccountType.INDIVIDUAL &&
        transaction.recipient.recipient_account_type === utils_1.AccountType.BUSINESS) {
        payload.paymentrequest.payment_type = 'P2B';
        payload.paymentrequest.sender.first_name =
            transaction.created_by.first_name;
        payload.paymentrequest.sender.middle_name = 'L';
        payload.paymentrequest.sender.last_name = transaction.created_by.last_name;
        payload.paymentrequest.recipient.organization_name =
            transaction.recipient.business_name;
    }
    else if (transaction.created_by.account_type === utils_1.AccountType.BUSINESS &&
        transaction.recipient.recipient_account_type === utils_1.AccountType.INDIVIDUAL) {
        payload.paymentrequest.payment_type = 'B2P';
        payload.paymentrequest.sender.organization_name =
            transaction.created_by.business_name;
        payload.paymentrequest.recipient.first_name =
            transaction.recipient.first_name;
        payload.paymentrequest.recipient.middle_name = 'M';
        payload.paymentrequest.recipient.last_name =
            transaction.recipient.last_name;
    }
    else if (transaction.created_by.account_type === utils_1.AccountType.INDIVIDUAL &&
        transaction.recipient.recipient_account_type === utils_1.AccountType.INDIVIDUAL) {
        payload.paymentrequest.payment_type = 'P2P';
        payload.paymentrequest.sender.first_name =
            transaction.created_by.first_name;
        payload.paymentrequest.sender.middle_name = 'L';
        payload.paymentrequest.sender.last_name = transaction.created_by.last_name;
        payload.paymentrequest.recipient.first_name =
            transaction.recipient.first_name;
        payload.paymentrequest.recipient.middle_name = 'M';
        payload.paymentrequest.recipient.last_name =
            transaction.recipient.last_name;
    }
    else if (transaction.created_by.account_type === utils_1.AccountType.BUSINESS &&
        transaction.recipient.recipient_account_type === utils_1.AccountType.BUSINESS) {
        payload.paymentrequest.payment_type = 'B2B';
        payload.paymentrequest.sender.organization_name =
            transaction.created_by.business_name;
        payload.paymentrequest.recipient.organization_name =
            transaction.recipient.business_name;
    }
    const signingKey = await signInProvider('../../src/helper/secret/master-card/fanam-sandbox-signing.p12');
    const encryptionPath = '../../src/helper/secret/master-card/mastercard-cross-border-services-ClientEnc1726060528257.pem';
    const decryptionPrivateKeyPath = '../../src/helper/secret/master-card/enckey.der';
    const config = await getEncryptionConfig(encryptionPath, decryptionPrivateKeyPath);
    console.log({
        'mastercard payout payload >>>': payload,
        'mastercard payout payload sender >>>>>': payload.paymentrequest.sender,
        'mastercard payout payload recipient >>>>>': payload.paymentrequest.recipient,
    });
    const data = await encryptPayload(payload, config);
    const url = `${process.env.MASTER_CARD_BASE_URL}/send/v1/partners/BEL_MASEND5ged2/crossborder/payment`;
    const authHeader = await authorizationHeader(url, common_const_1.POST, data, process.env.MASTER_CARD_PAYOUT_CONSUMER_KEY, signingKey);
    try {
        const response = await axios_1.default.post(url, data, {
            headers: {
                Authorization: authHeader,
                'Content-Type': 'application/json',
                'Content-Length': data.length,
                'x-encrypted': true,
            },
        });
        if (response?.data) {
            return await decryptResponse(response.data, config);
        }
    }
    catch (error) {
        console.log({
            error: 'PayoutError',
            timestamp: new Date(),
        });
        throw new common_1.BadRequestException(error?.response?.data?.Errors?.Error ||
            error?.response ||
            'something went wrong');
    }
}
exports.masterCardPayout = masterCardPayout;
async function masterCardWebhookdecrypt(response) {
    const encryptionPath = '../../src/helper/secret/master-card/mastercard-cross-border-services-ClientEnc1726060528257.pem';
    const decryptionPrivateKeyPath = '../../src/helper/secret/master-card/enckey.der';
    const config = await getEncryptionConfig(encryptionPath, decryptionPrivateKeyPath);
    const result = await decryptResponse(response, config);
    return result;
}
exports.masterCardWebhookdecrypt = masterCardWebhookdecrypt;
//# sourceMappingURL=master-card.helper.js.map
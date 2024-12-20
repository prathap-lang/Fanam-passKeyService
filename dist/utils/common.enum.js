"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessType = exports.BankCodeType = exports.BankAccountType = exports.KycType = exports.KycIdType = exports.ProviderStatus = exports.VisaWebhookOrderStatus = exports.PaymentWebhookOrderStatus = exports.RazorpayWebhookOrderStatus = exports.TransactionFilterOrderStatus = exports.OrderStatus = exports.Relationship = exports.TransactionStatus = exports.ProductCodes = exports.CurrencyNumericCodes = exports.CurrencyCodes = exports.TransactionPurpose = exports.AccountType = exports.Currency = exports.UserStatus = exports.Roles = void 0;
var Roles;
(function (Roles) {
    Roles["ROLE_USER"] = "User";
    Roles["ROLE_ADMIN"] = "Admin";
    Roles["ROLE_GUEST"] = "Guest";
})(Roles || (exports.Roles = Roles = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus["ACTIVE"] = "Active";
    UserStatus["IN_ACTIVE"] = "In_active";
    UserStatus["BLOCKED"] = "Blocked";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
var Currency;
(function (Currency) {
    Currency["DOLLAR"] = "Dollar";
    Currency["RUPEE"] = "Rupee";
})(Currency || (exports.Currency = Currency = {}));
var AccountType;
(function (AccountType) {
    AccountType["INDIVIDUAL"] = "Individual";
    AccountType["BUSINESS"] = "Business";
})(AccountType || (exports.AccountType = AccountType = {}));
var TransactionPurpose;
(function (TransactionPurpose) {
    TransactionPurpose["TUITION_FEE"] = "Tuition_fee";
    TransactionPurpose["TRAVEL"] = "Travel";
    TransactionPurpose["HOSPITAL"] = "Hospital";
    TransactionPurpose["INSURANCE"] = "Insurance";
    TransactionPurpose["LIVING_EXPENSE"] = "Living_expenses";
    TransactionPurpose["RENT"] = "Rent";
    TransactionPurpose["RETAIL"] = "Retail";
    TransactionPurpose["PAYROLL_AND_PENSION"] = "Payroll_and_pension";
    TransactionPurpose["IMPORT_AND_EXPORT"] = "Import_and_export";
    TransactionPurpose["LEGAL_FEES"] = "Legal_fees";
    TransactionPurpose["GOODS_PURCHASE"] = "Goods_purchase";
    TransactionPurpose["OTHERS"] = "Others";
})(TransactionPurpose || (exports.TransactionPurpose = TransactionPurpose = {}));
var CurrencyCodes;
(function (CurrencyCodes) {
    CurrencyCodes["AED"] = "AED";
    CurrencyCodes["AFN"] = "AFN";
    CurrencyCodes["ALL"] = "ALL";
    CurrencyCodes["AMD"] = "AMD";
    CurrencyCodes["ANG"] = "ANG";
    CurrencyCodes["AOA"] = "AOA";
    CurrencyCodes["ARS"] = "ARS";
    CurrencyCodes["AUD"] = "AUD";
    CurrencyCodes["AWG"] = "AWG";
    CurrencyCodes["AZN"] = "AZN";
    CurrencyCodes["BAM"] = "BAM";
    CurrencyCodes["BBD"] = "BBD";
    CurrencyCodes["BDT"] = "BDT";
    CurrencyCodes["BGN"] = "BGN";
    CurrencyCodes["BHD"] = "BHD";
    CurrencyCodes["BIF"] = "BIF";
    CurrencyCodes["BMD"] = "BMD";
    CurrencyCodes["BND"] = "BND";
    CurrencyCodes["BOB"] = "BOB";
    CurrencyCodes["BRL"] = "BRL";
    CurrencyCodes["BSD"] = "BSD";
    CurrencyCodes["BTN"] = "BTN";
    CurrencyCodes["BWP"] = "BWP";
    CurrencyCodes["BYN"] = "BYN";
    CurrencyCodes["BZD"] = "BZD";
    CurrencyCodes["CAD"] = "CAD";
    CurrencyCodes["CDF"] = "CDF";
    CurrencyCodes["CHF"] = "CHF";
    CurrencyCodes["CLP"] = "CLP";
    CurrencyCodes["CNY"] = "CNY";
    CurrencyCodes["COP"] = "COP";
    CurrencyCodes["CRC"] = "CRC";
    CurrencyCodes["CUP"] = "CUP";
    CurrencyCodes["CVE"] = "CVE";
    CurrencyCodes["CZK"] = "CZK";
    CurrencyCodes["DJF"] = "DJF";
    CurrencyCodes["DKK"] = "DKK";
    CurrencyCodes["DOP"] = "DOP";
    CurrencyCodes["DZD"] = "DZD";
    CurrencyCodes["EGP"] = "EGP";
    CurrencyCodes["ERN"] = "ERN";
    CurrencyCodes["ETB"] = "ETB";
    CurrencyCodes["EUR"] = "EUR";
    CurrencyCodes["FJD"] = "FJD";
    CurrencyCodes["FKP"] = "FKP";
    CurrencyCodes["FOK"] = "FOK";
    CurrencyCodes["GBP"] = "GBP";
    CurrencyCodes["GEL"] = "GEL";
    CurrencyCodes["GGP"] = "GGP";
    CurrencyCodes["GHS"] = "GHS";
    CurrencyCodes["GIP"] = "GIP";
    CurrencyCodes["GMD"] = "GMD";
    CurrencyCodes["GNF"] = "GNF";
    CurrencyCodes["GTQ"] = "GTQ";
    CurrencyCodes["GYD"] = "GYD";
    CurrencyCodes["HKD"] = "HKD";
    CurrencyCodes["HNL"] = "HNL";
    CurrencyCodes["HRK"] = "HRK";
    CurrencyCodes["HTG"] = "HTG";
    CurrencyCodes["HUF"] = "HUF";
    CurrencyCodes["IDR"] = "IDR";
    CurrencyCodes["ILS"] = "ILS";
    CurrencyCodes["IMP"] = "IMP";
    CurrencyCodes["INR"] = "INR";
    CurrencyCodes["IQD"] = "IQD";
    CurrencyCodes["IRR"] = "IRR";
    CurrencyCodes["ISK"] = "ISK";
    CurrencyCodes["JEP"] = "JEP";
    CurrencyCodes["JMD"] = "JMD";
    CurrencyCodes["JOD"] = "JOD";
    CurrencyCodes["JPY"] = "JPY";
    CurrencyCodes["KES"] = "KES";
    CurrencyCodes["KGS"] = "KGS";
    CurrencyCodes["KHR"] = "KHR";
    CurrencyCodes["KID"] = "KID";
    CurrencyCodes["KMF"] = "KMF";
    CurrencyCodes["KRW"] = "KRW";
    CurrencyCodes["KWD"] = "KWD";
    CurrencyCodes["KYD"] = "KYD";
    CurrencyCodes["KZT"] = "KZT";
    CurrencyCodes["LAK"] = "LAK";
    CurrencyCodes["LBP"] = "LBP";
    CurrencyCodes["LKR"] = "LKR";
    CurrencyCodes["LRD"] = "LRD";
    CurrencyCodes["LSL"] = "LSL";
    CurrencyCodes["LYD"] = "LYD";
    CurrencyCodes["MAD"] = "MAD";
    CurrencyCodes["MDL"] = "MDL";
    CurrencyCodes["MGA"] = "MGA";
    CurrencyCodes["MKD"] = "MKD";
    CurrencyCodes["MMK"] = "MMK";
    CurrencyCodes["MNT"] = "MNT";
    CurrencyCodes["MOP"] = "MOP";
    CurrencyCodes["MRU"] = "MRU";
    CurrencyCodes["MUR"] = "MUR";
    CurrencyCodes["MVR"] = "MVR";
    CurrencyCodes["MWK"] = "MWK";
    CurrencyCodes["MXN"] = "MXN";
    CurrencyCodes["MYR"] = "MYR";
    CurrencyCodes["MZN"] = "MZN";
    CurrencyCodes["NAD"] = "NAD";
    CurrencyCodes["NGN"] = "NGN";
    CurrencyCodes["NIO"] = "NIO";
    CurrencyCodes["NOK"] = "NOK";
    CurrencyCodes["NPR"] = "NPR";
    CurrencyCodes["NZD"] = "NZD";
    CurrencyCodes["OMR"] = "OMR";
    CurrencyCodes["PAB"] = "PAB";
    CurrencyCodes["PEN"] = "PEN";
    CurrencyCodes["PGK"] = "PGK";
    CurrencyCodes["PHP"] = "PHP";
    CurrencyCodes["PKR"] = "PKR";
    CurrencyCodes["PLN"] = "PLN";
    CurrencyCodes["PYG"] = "PYG";
    CurrencyCodes["QAR"] = "QAR";
    CurrencyCodes["RON"] = "RON";
    CurrencyCodes["RSD"] = "RSD";
    CurrencyCodes["RUB"] = "RUB";
    CurrencyCodes["RWF"] = "RWF";
    CurrencyCodes["SAR"] = "SAR";
    CurrencyCodes["SBD"] = "SBD";
    CurrencyCodes["SCR"] = "SCR";
    CurrencyCodes["SDG"] = "SDG";
    CurrencyCodes["SEK"] = "SEK";
    CurrencyCodes["SGD"] = "SGD";
    CurrencyCodes["SHP"] = "SHP";
    CurrencyCodes["SLL"] = "SLL";
    CurrencyCodes["SOS"] = "SOS";
    CurrencyCodes["SRD"] = "SRD";
    CurrencyCodes["SSP"] = "SSP";
    CurrencyCodes["STN"] = "STN";
    CurrencyCodes["SYP"] = "SYP";
    CurrencyCodes["SZL"] = "SZL";
    CurrencyCodes["THB"] = "THB";
    CurrencyCodes["TJS"] = "TJS";
    CurrencyCodes["TMT"] = "TMT";
    CurrencyCodes["TND"] = "TND";
    CurrencyCodes["TOP"] = "TOP";
    CurrencyCodes["TRY"] = "TRY";
    CurrencyCodes["TTD"] = "TTD";
    CurrencyCodes["TVD"] = "TVD";
    CurrencyCodes["TWD"] = "TWD";
    CurrencyCodes["TZS"] = "TZS";
    CurrencyCodes["UAH"] = "UAH";
    CurrencyCodes["UGX"] = "UGX";
    CurrencyCodes["USD"] = "USD";
    CurrencyCodes["UYU"] = "UYU";
    CurrencyCodes["UZS"] = "UZS";
    CurrencyCodes["VES"] = "VES";
    CurrencyCodes["VND"] = "VND";
    CurrencyCodes["VUV"] = "VUV";
    CurrencyCodes["WST"] = "WST";
    CurrencyCodes["XAF"] = "XAF";
    CurrencyCodes["XCD"] = "XCD";
    CurrencyCodes["XDR"] = "XDR";
    CurrencyCodes["XOF"] = "XOF";
    CurrencyCodes["XPF"] = "XPF";
    CurrencyCodes["YER"] = "YER";
    CurrencyCodes["ZAR"] = "ZAR";
    CurrencyCodes["ZMW"] = "ZMW";
    CurrencyCodes["ZWL"] = "ZWL";
})(CurrencyCodes || (exports.CurrencyCodes = CurrencyCodes = {}));
var CurrencyNumericCodes;
(function (CurrencyNumericCodes) {
    CurrencyNumericCodes["AED"] = "784";
    CurrencyNumericCodes["AFN"] = "971";
    CurrencyNumericCodes["ALL"] = "008";
    CurrencyNumericCodes["AMD"] = "051";
    CurrencyNumericCodes["ANG"] = "532";
    CurrencyNumericCodes["AOA"] = "973";
    CurrencyNumericCodes["ARS"] = "032";
    CurrencyNumericCodes["AUD"] = "036";
    CurrencyNumericCodes["AWG"] = "533";
    CurrencyNumericCodes["AZN"] = "944";
    CurrencyNumericCodes["BAM"] = "977";
    CurrencyNumericCodes["BBD"] = "052";
    CurrencyNumericCodes["BDT"] = "050";
    CurrencyNumericCodes["BGN"] = "975";
    CurrencyNumericCodes["BHD"] = "048";
    CurrencyNumericCodes["BIF"] = "108";
    CurrencyNumericCodes["BMD"] = "060";
    CurrencyNumericCodes["BND"] = "096";
    CurrencyNumericCodes["BOB"] = "068";
    CurrencyNumericCodes["BOV"] = "984";
    CurrencyNumericCodes["BRL"] = "986";
    CurrencyNumericCodes["BSD"] = "044";
    CurrencyNumericCodes["BTN"] = "064";
    CurrencyNumericCodes["BWP"] = "072";
    CurrencyNumericCodes["BYN"] = "933";
    CurrencyNumericCodes["BZD"] = "084";
    CurrencyNumericCodes["CAD"] = "124";
    CurrencyNumericCodes["CDF"] = "976";
    CurrencyNumericCodes["CHE"] = "947";
    CurrencyNumericCodes["CHF"] = "756";
    CurrencyNumericCodes["CHW"] = "948";
    CurrencyNumericCodes["CLF"] = "990";
    CurrencyNumericCodes["CLP"] = "152";
    CurrencyNumericCodes["CNY"] = "156";
    CurrencyNumericCodes["COP"] = "170";
    CurrencyNumericCodes["COU"] = "970";
    CurrencyNumericCodes["CRC"] = "188";
    CurrencyNumericCodes["CUC"] = "931";
    CurrencyNumericCodes["CUP"] = "192";
    CurrencyNumericCodes["CVE"] = "132";
    CurrencyNumericCodes["CZK"] = "203";
    CurrencyNumericCodes["DJF"] = "262";
    CurrencyNumericCodes["DKK"] = "208";
    CurrencyNumericCodes["DOP"] = "214";
    CurrencyNumericCodes["DZD"] = "012";
    CurrencyNumericCodes["EGP"] = "818";
    CurrencyNumericCodes["ERN"] = "232";
    CurrencyNumericCodes["ETB"] = "230";
    CurrencyNumericCodes["EUR"] = "978";
    CurrencyNumericCodes["FJD"] = "242";
    CurrencyNumericCodes["FKP"] = "238";
    CurrencyNumericCodes["FOK"] = "234";
    CurrencyNumericCodes["GBP"] = "826";
    CurrencyNumericCodes["GEL"] = "981";
    CurrencyNumericCodes["GGP"] = "831";
    CurrencyNumericCodes["GHS"] = "936";
    CurrencyNumericCodes["GIP"] = "292";
    CurrencyNumericCodes["GMD"] = "270";
    CurrencyNumericCodes["GNF"] = "324";
    CurrencyNumericCodes["GTQ"] = "320";
    CurrencyNumericCodes["GYD"] = "328";
    CurrencyNumericCodes["HKD"] = "344";
    CurrencyNumericCodes["HNL"] = "340";
    CurrencyNumericCodes["HRK"] = "191";
    CurrencyNumericCodes["HTG"] = "332";
    CurrencyNumericCodes["HUF"] = "348";
    CurrencyNumericCodes["IDR"] = "360";
    CurrencyNumericCodes["ILS"] = "376";
    CurrencyNumericCodes["IMP"] = "833";
    CurrencyNumericCodes["INR"] = "356";
    CurrencyNumericCodes["IQD"] = "368";
    CurrencyNumericCodes["IRR"] = "364";
    CurrencyNumericCodes["ISK"] = "352";
    CurrencyNumericCodes["JEP"] = "832";
    CurrencyNumericCodes["JMD"] = "388";
    CurrencyNumericCodes["JOD"] = "400";
    CurrencyNumericCodes["JPY"] = "392";
    CurrencyNumericCodes["KES"] = "404";
    CurrencyNumericCodes["KGS"] = "417";
    CurrencyNumericCodes["KHR"] = "116";
    CurrencyNumericCodes["KID"] = "296";
    CurrencyNumericCodes["KMF"] = "174";
    CurrencyNumericCodes["KRW"] = "410";
    CurrencyNumericCodes["KWD"] = "414";
    CurrencyNumericCodes["KYD"] = "136";
    CurrencyNumericCodes["KZT"] = "398";
    CurrencyNumericCodes["LAK"] = "418";
    CurrencyNumericCodes["LBP"] = "422";
    CurrencyNumericCodes["LKR"] = "144";
    CurrencyNumericCodes["LRD"] = "430";
    CurrencyNumericCodes["LSL"] = "426";
    CurrencyNumericCodes["LYD"] = "434";
    CurrencyNumericCodes["MAD"] = "504";
    CurrencyNumericCodes["MDL"] = "498";
    CurrencyNumericCodes["MGA"] = "969";
    CurrencyNumericCodes["MKD"] = "807";
    CurrencyNumericCodes["MMK"] = "104";
    CurrencyNumericCodes["MNT"] = "496";
    CurrencyNumericCodes["MOP"] = "446";
    CurrencyNumericCodes["MRU"] = "929";
    CurrencyNumericCodes["MUR"] = "480";
    CurrencyNumericCodes["MVR"] = "462";
    CurrencyNumericCodes["MWK"] = "454";
    CurrencyNumericCodes["MXN"] = "484";
    CurrencyNumericCodes["MXV"] = "979";
    CurrencyNumericCodes["MYR"] = "458";
    CurrencyNumericCodes["MZN"] = "943";
    CurrencyNumericCodes["NAD"] = "516";
    CurrencyNumericCodes["NGN"] = "566";
    CurrencyNumericCodes["NIO"] = "558";
    CurrencyNumericCodes["NOK"] = "578";
    CurrencyNumericCodes["NPR"] = "524";
    CurrencyNumericCodes["NZD"] = "554";
    CurrencyNumericCodes["OMR"] = "512";
    CurrencyNumericCodes["PAB"] = "590";
    CurrencyNumericCodes["PEN"] = "604";
    CurrencyNumericCodes["PGK"] = "598";
    CurrencyNumericCodes["PHP"] = "608";
    CurrencyNumericCodes["PKR"] = "586";
    CurrencyNumericCodes["PLN"] = "985";
    CurrencyNumericCodes["PYG"] = "600";
    CurrencyNumericCodes["QAR"] = "634";
    CurrencyNumericCodes["RON"] = "946";
    CurrencyNumericCodes["RSD"] = "941";
    CurrencyNumericCodes["RUB"] = "643";
    CurrencyNumericCodes["RWF"] = "646";
    CurrencyNumericCodes["SAR"] = "682";
    CurrencyNumericCodes["SBD"] = "090";
    CurrencyNumericCodes["SCR"] = "690";
    CurrencyNumericCodes["SDG"] = "938";
    CurrencyNumericCodes["SEK"] = "752";
    CurrencyNumericCodes["SGD"] = "702";
    CurrencyNumericCodes["SHP"] = "654";
    CurrencyNumericCodes["SLE"] = "925";
    CurrencyNumericCodes["SLL"] = "694";
    CurrencyNumericCodes["SOS"] = "706";
    CurrencyNumericCodes["SRD"] = "968";
    CurrencyNumericCodes["SSP"] = "728";
    CurrencyNumericCodes["STN"] = "930";
    CurrencyNumericCodes["SVC"] = "222";
    CurrencyNumericCodes["SYP"] = "760";
    CurrencyNumericCodes["SZL"] = "748";
    CurrencyNumericCodes["THB"] = "764";
    CurrencyNumericCodes["TJS"] = "972";
    CurrencyNumericCodes["TMT"] = "934";
    CurrencyNumericCodes["TND"] = "788";
    CurrencyNumericCodes["TOP"] = "776";
    CurrencyNumericCodes["TRY"] = "949";
    CurrencyNumericCodes["TTD"] = "780";
    CurrencyNumericCodes["TWD"] = "901";
    CurrencyNumericCodes["TZS"] = "834";
    CurrencyNumericCodes["UAH"] = "980";
    CurrencyNumericCodes["UGX"] = "800";
    CurrencyNumericCodes["USD"] = "840";
    CurrencyNumericCodes["USN"] = "997";
    CurrencyNumericCodes["UYI"] = "940";
    CurrencyNumericCodes["UYU"] = "858";
    CurrencyNumericCodes["UYW"] = "927";
    CurrencyNumericCodes["UZS"] = "860";
    CurrencyNumericCodes["VED"] = "926";
    CurrencyNumericCodes["VES"] = "928";
    CurrencyNumericCodes["VND"] = "704";
    CurrencyNumericCodes["VUV"] = "548";
    CurrencyNumericCodes["WST"] = "882";
    CurrencyNumericCodes["XAF"] = "950";
    CurrencyNumericCodes["XAG"] = "961";
    CurrencyNumericCodes["XAU"] = "959";
    CurrencyNumericCodes["XBA"] = "955";
    CurrencyNumericCodes["XBB"] = "956";
    CurrencyNumericCodes["XBC"] = "957";
    CurrencyNumericCodes["XBD"] = "958";
    CurrencyNumericCodes["XCD"] = "951";
    CurrencyNumericCodes["XDR"] = "960";
    CurrencyNumericCodes["XOF"] = "952";
    CurrencyNumericCodes["XPD"] = "964";
    CurrencyNumericCodes["XPF"] = "953";
    CurrencyNumericCodes["XPT"] = "962";
    CurrencyNumericCodes["XSU"] = "994";
    CurrencyNumericCodes["XTS"] = "963";
    CurrencyNumericCodes["XUA"] = "965";
    CurrencyNumericCodes["XXX"] = "999";
    CurrencyNumericCodes["YER"] = "886";
    CurrencyNumericCodes["ZAR"] = "710";
    CurrencyNumericCodes["ZMW"] = "967";
    CurrencyNumericCodes["ZWL"] = "932";
})(CurrencyNumericCodes || (exports.CurrencyNumericCodes = CurrencyNumericCodes = {}));
var ProductCodes;
(function (ProductCodes) {
    ProductCodes["BANK"] = "BANK";
    ProductCodes["WALLET"] = "WALLET";
    ProductCodes["A"] = "A";
    ProductCodes["B"] = "B";
})(ProductCodes || (exports.ProductCodes = ProductCodes = {}));
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["TRANSACTION_INITIATED"] = "Transaction_initiated";
    TransactionStatus["INVOICE_UPLOAD"] = "Invoice_upload";
    TransactionStatus["RECIPIENT_PICKED"] = "Recipient_picked";
    TransactionStatus["BENEFICIARY_PICKED"] = "Beneficiary_picked";
    TransactionStatus["PAYMENT_INITIATED"] = "Payment_initiated";
    TransactionStatus["PAYMENT_PENDING"] = "Payment_pending";
    TransactionStatus["PAYMENT_SUCCESSFUL"] = "Payment_successful";
    TransactionStatus["PAYMENT_FAILED"] = "Payment_failed";
})(TransactionStatus || (exports.TransactionStatus = TransactionStatus = {}));
var Relationship;
(function (Relationship) {
    Relationship["FATHER"] = "Father";
    Relationship["MOTHER"] = "Mother";
    Relationship["SISTER"] = "Sister";
    Relationship["BROTHER"] = "Brother";
    Relationship["COUSIN"] = "Cousin";
    Relationship["SON"] = "Son";
    Relationship["DAUGHTER"] = "Daughter";
    Relationship["FRIEND"] = "Friend";
    Relationship["UNCLE"] = "Uncle";
    Relationship["AUNTY"] = "Aunty";
    Relationship["GRANDMOTHER"] = "Grandmother";
    Relationship["GRANDFATHER"] = "Grandfather";
    Relationship["SISTER_IN_LAW"] = "Sister_in_law";
    Relationship["FATHER_IN_LAW"] = "Father_in_law";
    Relationship["MOTHER_IN_LAW"] = "Mother_in_law";
    Relationship["BROTHER_IN_LAW"] = "Brother_in_law";
    Relationship["NEPHEW"] = "Nephew";
    Relationship["NIECE"] = "Niece";
    Relationship["NOT_APPLICABLE"] = "Not_applicable";
    Relationship["OTHERS"] = "Others";
})(Relationship || (exports.Relationship = Relationship = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PAYMENT_INITIATED"] = "Payment_initiated";
    OrderStatus["PAYMENT_IN_TRANSITION"] = "Payment_in_transition";
    OrderStatus["PAYMENT_FAILURE"] = "Payment_failed";
    OrderStatus["PAYMENT_REJECTED"] = "Payment_rejected";
    OrderStatus["REFUND_INITIATED"] = "Refund_initiated";
    OrderStatus["REFUND_IN_PROGRESS"] = "Refund_in_progress";
    OrderStatus["REFUND_SUCCESSFUL"] = "Refunded_successfully";
    OrderStatus["REFUND_FAILED"] = "Refund_failed";
    OrderStatus["TRANSACTION_PENDING"] = "Transaction_pending";
    OrderStatus["TRANSACTION_CANCELED"] = "Transaction_canceled";
    OrderStatus["TRANSACTION_RETURNED"] = "Transaction_returned";
    OrderStatus["TRANSACTION_SUCCESS"] = "Transaction_success";
    OrderStatus["TRANSACTION_FAILURE"] = "Transaction_failed";
    OrderStatus["TRANSACTION_REJECTED"] = "Transaction_rejected";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
var TransactionFilterOrderStatus;
(function (TransactionFilterOrderStatus) {
    TransactionFilterOrderStatus["TRANSACTION_CANCELED"] = "Transaction_canceled";
    TransactionFilterOrderStatus["TRANSACTION_SUCCESS"] = "Transaction_success";
    TransactionFilterOrderStatus["TRANSACTION_FAILURE"] = "Transaction_failed";
    TransactionFilterOrderStatus["TRANSACTION_PENDING"] = "Transaction_pending";
    TransactionFilterOrderStatus["PAYMENT_IN_TRANSITION"] = "Payment_in_transition";
    TransactionFilterOrderStatus["REFUND_INITIATED"] = "Refund_initiated";
    TransactionFilterOrderStatus["REFUND_IN_PROGRESS"] = "Refund_in_progress";
    TransactionFilterOrderStatus["REFUND_SUCCESSFUL"] = "Refunded_successfully";
    TransactionFilterOrderStatus["REFUND_FAILED"] = "Refund_failed";
})(TransactionFilterOrderStatus || (exports.TransactionFilterOrderStatus = TransactionFilterOrderStatus = {}));
var RazorpayWebhookOrderStatus;
(function (RazorpayWebhookOrderStatus) {
    RazorpayWebhookOrderStatus["WEBHOOK_ORDER_SUCCESS"] = "order.paid";
    RazorpayWebhookOrderStatus["WEBHOOK_ORDER_CAPTURED"] = "order.captured";
    RazorpayWebhookOrderStatus["WEBHOOK_ORDER_FAILED"] = "payment.failed";
    RazorpayWebhookOrderStatus["WEBHOOK_REFUND_CREATED"] = "refund.created";
    RazorpayWebhookOrderStatus["WEBHOOK_REFUND_FAILED"] = "refund.failed";
    RazorpayWebhookOrderStatus["WEBHOOK_REFUND_PROCESSED"] = "refund.processed";
})(RazorpayWebhookOrderStatus || (exports.RazorpayWebhookOrderStatus = RazorpayWebhookOrderStatus = {}));
var PaymentWebhookOrderStatus;
(function (PaymentWebhookOrderStatus) {
    PaymentWebhookOrderStatus["WEBHOOK_ORDER_MC_SUCCESS"] = "SUCCESS";
    PaymentWebhookOrderStatus["WEBHOOK_ORDER_MC_CANCELLED"] = "CANCELLED";
    PaymentWebhookOrderStatus["WEBHOOK_ORDER_MC_PENDING"] = "PENDING";
    PaymentWebhookOrderStatus["WEBHOOK_ORDER_MC_REJECTED"] = "REJECTED";
    PaymentWebhookOrderStatus["WEBHOOK_ORDER_MC_RETURNED"] = "RETURNED";
    PaymentWebhookOrderStatus["WEBHOOK_ORDER_VISA_RECIVED"] = "PAYMENT_RECEIVED";
    PaymentWebhookOrderStatus["WEBHOOK_ORDER_VISA_PENDING"] = "PAYMENT_PENDING";
})(PaymentWebhookOrderStatus || (exports.PaymentWebhookOrderStatus = PaymentWebhookOrderStatus = {}));
var VisaWebhookOrderStatus;
(function (VisaWebhookOrderStatus) {
    VisaWebhookOrderStatus["WEBHOOK_ORDER_RECIVED"] = "PAYMENT_RECEIVED";
    VisaWebhookOrderStatus["WEBHOOK_ORDER_PENDING"] = "PAYMENT_PENDING";
})(VisaWebhookOrderStatus || (exports.VisaWebhookOrderStatus = VisaWebhookOrderStatus = {}));
var ProviderStatus;
(function (ProviderStatus) {
    ProviderStatus["VISA"] = "Visa";
    ProviderStatus["MASTERCARD"] = "MasterCard";
})(ProviderStatus || (exports.ProviderStatus = ProviderStatus = {}));
var KycIdType;
(function (KycIdType) {
    KycIdType["AADHAR"] = "Aadhaar";
    KycIdType["PAN"] = "PAN";
    KycIdType["CST"] = "CST";
    KycIdType["VAT"] = "VAT";
    KycIdType["GST"] = "GST";
    KycIdType["PASSPORT"] = "Passport";
    KycIdType["DRIVING_LICENSE"] = "Driving_License";
    KycIdType["PASSBOOK"] = "Passbook";
    KycIdType["VOTER_ID"] = "Voter_id";
    KycIdType["JOB_CARD"] = "Job_card";
    KycIdType["NPR_LETTER"] = "NPR_letter";
    KycIdType["UTILITY_BILL"] = "Utility_bill";
    KycIdType["BANK_STATEMENT"] = "Bank_statement";
    KycIdType["REGISTRATION_CERTIFICATE"] = "Registration_certificate";
    KycIdType["SHOP_LICENSE"] = "Shop_license";
    KycIdType["TAX_RETURNS"] = "Tax_returns";
    KycIdType["TAX_REGISTRATION"] = "Tax_registration";
    KycIdType["INCORPORATION_CERTIFICATE"] = "Incorporation_certificate";
    KycIdType["MOA"] = "MOA";
    KycIdType["BOARD_RESOLUTION"] = "Board_resolution";
    KycIdType["COPARCENARY_DECLARATION"] = "Coparcenary_declaration";
    KycIdType["KYC_NORMS"] = "KYC_norms";
    KycIdType["PARTNERSHIP_DEED"] = "Partnership_deed";
    KycIdType["POWER_OF_ATTORNEY"] = "Power_of_attorney";
    KycIdType["LLP_AGREEMENT"] = "LLP_agreement";
    KycIdType["REGISTRATION_CERTIFICATE_OF_LLP"] = "Registration_certificate_of_LLP";
})(KycIdType || (exports.KycIdType = KycIdType = {}));
var KycType;
(function (KycType) {
    KycType["IDENTITY_PROOF"] = "Identity_proof";
    KycType["ADDRESS_PROOF"] = "Address_proof";
    KycType["BUSINESS_PROOF"] = "Business_proof";
    KycType["AUTHORITY_PROOF"] = "Authority_proof";
    KycType["IDENTITY_AND_ADDRESS_PROOF"] = "Identity_and_address_proof";
})(KycType || (exports.KycType = KycType = {}));
var BankAccountType;
(function (BankAccountType) {
    BankAccountType["CURRENT"] = "Current";
    BankAccountType["SAVINGS"] = "Savings";
    BankAccountType["OVERDRAFT"] = "Overdraft";
})(BankAccountType || (exports.BankAccountType = BankAccountType = {}));
var BankCodeType;
(function (BankCodeType) {
    BankCodeType["SORT"] = "Sort";
    BankCodeType["SWIFT"] = "Swift";
    BankCodeType["BSB"] = "BSB";
    BankCodeType["ROUTING"] = "Routing";
    BankCodeType["IFSC"] = "IFSC";
    BankCodeType["IBAN"] = "IBAN";
})(BankCodeType || (exports.BankCodeType = BankCodeType = {}));
var BusinessType;
(function (BusinessType) {
    BusinessType["SOLE_PROPRIETOR"] = "Sole_proprietor";
    BusinessType["PARTNERSHIP_FIRM"] = "Partnership_firm";
    BusinessType["COMPANIES"] = "Companies";
    BusinessType["LIMITED_LIABILITY_PARTNERSHIP"] = "Limited_liability_partnership";
})(BusinessType || (exports.BusinessType = BusinessType = {}));
//# sourceMappingURL=common.enum.js.map
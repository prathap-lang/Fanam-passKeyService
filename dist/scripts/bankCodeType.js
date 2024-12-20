"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const csv_parse_1 = require("csv-parse");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const util_1 = require("util");
const common_enum_1 = require("../utils/common.enum");
const parsePromise = (0, util_1.promisify)(csv_parse_1.parse);
async function bankCodeTypeScript() {
    try {
        const prisma = new client_1.PrismaClient();
        const bankCodeTypesContent = await (0, promises_1.readFile)((0, path_1.resolve)(__dirname, '../scripts/dm/bankCodeType.csv'));
        const bankCodeInfo = await parsePromise(bankCodeTypesContent, {
            columns: true,
        });
        const CountriesCurrencies = [
            common_enum_1.CurrencyCodes.USD,
            common_enum_1.CurrencyCodes.JPY,
            common_enum_1.CurrencyCodes.SGD,
            common_enum_1.CurrencyCodes.EUR,
            common_enum_1.CurrencyCodes.AUD,
            common_enum_1.CurrencyCodes.AED,
            common_enum_1.CurrencyCodes.CNY,
        ];
        const countries = await prisma.country.findMany({
            where: {
                currency: { in: CountriesCurrencies },
                is_active: true,
            },
        });
        for (const country of countries) {
            const bankInputs = [];
            for (const bankCode of bankCodeInfo) {
                const input = {
                    type: bankCode.type,
                    regEx: bankCode.regEx,
                    label: bankCode.label,
                };
                switch (country.currency) {
                    case common_enum_1.CurrencyCodes.USD:
                        if (bankCode.type === common_enum_1.BankCodeType.SWIFT ||
                            bankCode.type === common_enum_1.BankCodeType.ROUTING) {
                            bankInputs.push(input);
                        }
                        break;
                    case common_enum_1.CurrencyCodes.JPY:
                        if (bankCode.type === common_enum_1.BankCodeType.SWIFT ||
                            bankCode.type === common_enum_1.BankCodeType.IBAN) {
                            bankInputs.push(input);
                        }
                        break;
                    case common_enum_1.CurrencyCodes.SGD:
                        if (bankCode.type === common_enum_1.BankCodeType.SWIFT) {
                            bankInputs.push(input);
                        }
                        break;
                    case common_enum_1.CurrencyCodes.AED:
                        if (bankCode.type === common_enum_1.BankCodeType.IBAN) {
                            bankInputs.push(input);
                        }
                        break;
                    case common_enum_1.CurrencyCodes.CNY:
                        if (bankCode.type === common_enum_1.BankCodeType.SWIFT) {
                            bankInputs.push(input);
                        }
                        break;
                    case common_enum_1.CurrencyCodes.AUD:
                        if (bankCode.type === common_enum_1.BankCodeType.BSB) {
                            bankInputs.push(input);
                        }
                        break;
                    case common_enum_1.CurrencyCodes.EUR:
                        if (bankCode.type === common_enum_1.BankCodeType.IBAN) {
                            bankInputs.push(input);
                        }
                        break;
                }
            }
            await prisma.country.update({
                where: { country_id: country.country_id },
                data: {
                    bankInputs: { set: bankInputs },
                },
            });
            if (bankInputs.length === 0) {
                console.log(`No bank inputs found for ${country.country_name}`);
            }
            else {
                console.log(`Updated bank inputs for ${country.country_name}:`, bankInputs);
            }
        }
        await prisma.$disconnect();
    }
    catch (error) {
        console.error('Error:', error);
    }
}
bankCodeTypeScript();
//# sourceMappingURL=bankCodeType.js.map
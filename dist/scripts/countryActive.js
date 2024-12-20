"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const common_enum_1 = require("../utils/common.enum");
async function countryActiveScript() {
    try {
        const prisma = new client_1.PrismaClient();
        const CountriesCurrencies = [
            common_enum_1.CurrencyCodes.INR,
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
            },
        });
        if (!countries.length) {
            throw new common_1.NotFoundException('Country not found to update');
        }
        const countyIds = countries.map((it) => it.country_id);
        await prisma.country.updateMany({
            where: { country_id: { in: countyIds } },
            data: {
                is_active: true,
            },
        });
        for (const country of countries) {
            console.log(`Updated is_active status for ${country.country_name}`);
        }
        await prisma.$disconnect();
    }
    catch (error) {
        console.error('Error:', error);
    }
}
countryActiveScript();
//# sourceMappingURL=countryActive.js.map
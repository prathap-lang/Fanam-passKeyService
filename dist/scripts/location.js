"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs_1 = require("fs");
const path_1 = require("path");
const utils_1 = require("../utils");
const prisma = new client_1.PrismaClient();
async function main() {
    try {
        function parseDocument(docPath) {
            return JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(__dirname, docPath), 'utf-8'));
        }
        const regions = parseDocument('../../documents/location.json');
        let regionsCount = 0;
        let totalSubRegionsCount = 0;
        let totalCountriesCount = 0;
        let totalStatesCount = 0;
        let totalCitiesCount = 0;
        let subRegionsCount = 0;
        let countriesCount = 0;
        let statesCount = 0;
        let citiesCount = 0;
        (0, utils_1.printLog)('TOTAL REGIONS: ', regions.length);
        for (const { region_id, region_name, subregions } of regions) {
            const regionRes = await prisma.region.upsert({
                create: { region_id, region_name },
                update: { region_id, region_name },
                where: { region_id },
            });
            if (regionRes)
                regionsCount += 1;
            (0, utils_1.printLog)(`TOTAL SUB-REGIONS of : ${region_name}`, subregions.length);
            totalSubRegionsCount += subregions.length;
            for (const { subregion_name, subregion_id, countries } of subregions) {
                const body = { subregion_id, subregion_name, region_id };
                const subRegRes = await prisma.subregion.upsert({
                    create: body,
                    update: body,
                    where: { subregion_id },
                });
                if (subRegRes)
                    subRegionsCount += 1;
                (0, utils_1.printLog)(`TOTAL COUNTRIES of : ${subregion_name}`, countries.length);
                totalCountriesCount += countries.length;
                for (const { country_id, country_name, iso3, iso2, emoji, emojiU, numeric_code, phone_code, capital, currency, currency_name, currency_symbol, tld, native, nationality, latitude, longitude, states, } of countries) {
                    const body = {
                        country_id,
                        country_name,
                        iso3,
                        iso2,
                        emoji,
                        emojiU,
                        numeric_code,
                        phone_code,
                        capital,
                        currency,
                        currency_name,
                        currency_symbol,
                        tld,
                        native,
                        nationality,
                        latitude,
                        longitude,
                        subregion_id,
                    };
                    const countryRes = await prisma.country.upsert({
                        create: body,
                        update: body,
                        where: { country_id },
                    });
                    if (countryRes)
                        countriesCount += 1;
                    (0, utils_1.printLog)(`TOTAL STATES of : ${country_name}`, states.length);
                    totalStatesCount += states.length;
                    for (const { state_id, state_name, state_code, latitude, longitude, type, cities, } of states) {
                        const body = {
                            state_id,
                            state_name,
                            state_code,
                            latitude,
                            longitude,
                            type,
                            country_id,
                        };
                        const stateRes = await prisma.state.upsert({
                            create: body,
                            update: body,
                            where: { state_id },
                        });
                        if (stateRes)
                            statesCount += 1;
                        (0, utils_1.printLog)(`TOTAL CITIES of : ${state_name}`, cities.length);
                        totalCitiesCount += cities.length;
                        for (const { city_id, city_name, latitude, longitude } of cities) {
                            const body = {
                                city_id,
                                city_name,
                                latitude,
                                longitude,
                                state_id,
                            };
                            const cityRes = await prisma.city.upsert({
                                create: body,
                                update: body,
                                where: { city_id },
                            });
                            if (cityRes)
                                citiesCount += 1;
                        }
                        (0, utils_1.printLog)('UPLOADED CITIES: ', `${citiesCount} / ${totalCitiesCount}`);
                    }
                    (0, utils_1.printLog)('UPLOADED STATES: ', `${statesCount} / ${totalStatesCount}`);
                }
                (0, utils_1.printLog)('UPLOADED COUNTRIES: ', `${countriesCount} / ${totalCountriesCount}`);
            }
            (0, utils_1.printLog)('UPLOADED SUB-REGIONS: ', `${subRegionsCount} / ${totalSubRegionsCount}`);
        }
        (0, utils_1.printLog)('UPLOADED REGIONS: ', `${regionsCount} / ${regions.length}`);
        (0, utils_1.printLog)('SCRIPT Executed successfully >>>>>>>');
    }
    catch (error) {
        (0, utils_1.printLog)('Error while processing location script >>>>>>>', error);
    }
}
main()
    .catch((error) => {
    (0, utils_1.printLog)(error);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=location.js.map
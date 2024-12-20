"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const csv_parse_1 = require("csv-parse");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const util_1 = require("util");
const parsePromise = (0, util_1.promisify)(csv_parse_1.parse);
async function createTransferTimes() {
    try {
        const prisma = new client_1.PrismaClient();
        const existingTransferTimes = await prisma.transferTime.findMany();
        if (existingTransferTimes.length) {
            const ids = existingTransferTimes.map((it) => it.transfer_time_id);
            await prisma.transferTime.deleteMany({
                where: { transfer_time_id: { in: ids } },
            });
        }
        const countries = await prisma.country.findMany({
            where: {
                currency: {
                    in: ['EUR', 'USD', 'SGD', 'JPY', 'CNY', 'AUD', 'AED'],
                },
                is_active: true,
            },
        });
        if (!countries.length) {
            console.log('No relevant countries found.');
            return;
        }
        const transferTimeContent = await (0, promises_1.readFile)((0, path_1.resolve)(__dirname, '../scripts/dm/transferTime.csv'));
        const transferTimeInfo = await parsePromise(transferTimeContent, {
            columns: true,
        });
        for (const country of countries) {
            const countryTransferTimes = transferTimeInfo.filter((row) => row.currency === country.currency);
            if (!countryTransferTimes.length) {
                console.log(`No transfer time data for ${country.currency}.`);
                continue;
            }
            for (const transferTime of countryTransferTimes) {
                await prisma.transferTime.create({
                    data: {
                        country: { connect: { country_id: country.country_id } },
                        transfer_network: transferTime.transfer_network,
                        fx_rate_network: transferTime.fx_rate_network,
                        sla_timing_min: parseInt(transferTime.sla_timing_min),
                        sla_timing_max: parseInt(transferTime.sla_timing_max),
                        mark_up_rate: parseFloat(transferTime.mark_up_rate),
                        other_fees: parseFloat(transferTime.other_fees),
                        duration_time: parseFloat(transferTime.expiration_time),
                        is_exclude_other_fees: transferTime.exclude_other_fee === 'TRUE',
                        is_recommended: transferTime.recommended === 'TRUE',
                    },
                });
            }
        }
        console.log('Transfer times for relevant countries inserted successfully.');
        await prisma.$disconnect();
    }
    catch (error) {
        console.error('Error inserting transfer times:', error);
    }
}
createTransferTimes();
//# sourceMappingURL=transfer-time.js.map
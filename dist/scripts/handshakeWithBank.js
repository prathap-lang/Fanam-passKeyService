"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const csv_parse_1 = require("csv-parse");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const util_1 = require("util");
const parsePromise = (0, util_1.promisify)(csv_parse_1.parse);
async function handshakeWithBankScript() {
    try {
        const prisma = new client_1.PrismaClient();
        const handShakeContent = await (0, promises_1.readFile)((0, path_1.resolve)(__dirname, '../scripts/dm/handshakeWithBank.csv'));
        const handeshakeInfo = await parsePromise(handShakeContent, {
            columns: true,
        });
        console.log('handeshakeInfo', handeshakeInfo);
        await prisma.$disconnect();
    }
    catch (error) {
        console.error('Error:', error);
    }
}
handshakeWithBankScript();
//# sourceMappingURL=handshakeWithBank.js.map
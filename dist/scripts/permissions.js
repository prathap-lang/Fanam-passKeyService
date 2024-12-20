"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissions = void 0;
const client_1 = require("@prisma/client");
const common_service_1 = require("../utils/common.service");
const permissions_enum_1 = require("../utils/permissions.enum");
async function permissions() {
    (0, common_service_1.printLog)(`Permissions found : `, Object.keys(permissions_enum_1.Permissions).length);
    const prisma = new client_1.PrismaClient();
    const dbTransactions = [];
    const keys = Object.keys(permissions_enum_1.Permissions);
    for (const it of keys) {
        const identifier = { identifier: permissions_enum_1.Permissions[it] };
        dbTransactions.push(prisma.permissions.upsert({
            where: identifier,
            create: identifier,
            update: identifier,
        }));
    }
    const permissions = await prisma.$transaction(dbTransactions);
    (0, common_service_1.printLog)(`Permissions loaded successfully : `, permissions.length);
}
exports.permissions = permissions;
permissions();
//# sourceMappingURL=permissions.js.map
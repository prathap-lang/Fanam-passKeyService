"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roles = void 0;
const client_1 = require("@prisma/client");
const common_enum_1 = require("../utils/common.enum");
const common_service_1 = require("../utils/common.service");
const permissions_enum_1 = require("../utils/permissions.enum");
const UserPermission = [
    permissions_enum_1.Permissions.CREATE_BENEFICIARY,
    permissions_enum_1.Permissions.GET_ALL_BENEFICIARY,
    permissions_enum_1.Permissions.GET_BENEFICIARY,
    permissions_enum_1.Permissions.UPDATE_BENEFICIARY,
    permissions_enum_1.Permissions.DELETE_BENEFICIARY,
];
const rolesData = [
    {
        role: common_enum_1.Roles.ROLE_USER,
        permissions: UserPermission.map((it) => {
            return { identifier: it };
        }),
    },
];
async function roles() {
    const prisma = new client_1.PrismaClient();
    const dbTransactions = [];
    for (const data of rolesData) {
        dbTransactions.push(prisma.role.upsert({
            where: { role: data.role },
            create: {
                role: data.role,
                permissions: { connect: data.permissions },
            },
            update: {
                role: data.role,
                permissions: { connect: data.permissions },
            },
        }));
    }
    const roles = await prisma.$transaction(dbTransactions);
    (0, common_service_1.printLog)('\nRoles ', roles.length, ' created');
}
exports.roles = roles;
roles();
//# sourceMappingURL=roles.js.map
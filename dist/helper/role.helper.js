"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRole = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../utils");
async function getRole(prisma, role) {
    const roleEnum = Object.values(utils_1.Roles).find((userRole) => userRole === role);
    if (!roleEnum)
        throw new common_1.NotFoundException('Role not found to get role');
    const roleData = await prisma.role.findFirst({
        where: { role: roleEnum },
    });
    if (!roleData) {
        (0, utils_1.printLog)(`Role - ${role} not found`);
        throw new common_1.BadRequestException(`Something went wrong`);
    }
    return roleData.role_id;
}
exports.getRole = getRole;
//# sourceMappingURL=role.helper.js.map
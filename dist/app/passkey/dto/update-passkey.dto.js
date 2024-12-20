"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePasskeyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_passkey_dto_1 = require("./create-passkey.dto");
class UpdatePasskeyDto extends (0, swagger_1.PartialType)(create_passkey_dto_1.CreatePasskeyDto) {
}
exports.UpdatePasskeyDto = UpdatePasskeyDto;
//# sourceMappingURL=update-passkey.dto.js.map
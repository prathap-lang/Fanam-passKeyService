"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecureStore = void 0;
const crypto_1 = __importDefault(require("crypto"));
class SecureStore {
    static getHashString(data) {
        const dataString = JSON.stringify(data);
        const hash = crypto_1.default.createHash('sha256');
        hash.update(dataString);
        return hash.digest('hex');
    }
}
exports.SecureStore = SecureStore;
//# sourceMappingURL=secure-store.js.map
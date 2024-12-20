"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileInterceptor = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../utils");
class FileInterceptor {
    async intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const { invoice = [], kyc = [] } = request.files;
        const files = [...invoice, ...kyc];
        if (files.length) {
            const maxSize = (0, utils_1.formatFileSize)(utils_1.MAX_FILE_SIZE);
            for (const file of files) {
                const { size, originalname } = file;
                const fileSize = (0, utils_1.formatFileSize)(size);
                if (size > utils_1.MAX_FILE_SIZE)
                    throw new common_1.BadRequestException(`${originalname} size is ${fileSize} larger than ${maxSize}. Please upload file within the limit.`);
                else {
                }
            }
            request.uploads = files;
        }
        return next.handle();
    }
}
exports.FileInterceptor = FileInterceptor;
//# sourceMappingURL=file.interceptor.js.map
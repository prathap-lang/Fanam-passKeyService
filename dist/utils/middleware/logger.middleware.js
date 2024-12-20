"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const logger_service_1 = require("../../logger.service");
let LoggerMiddleware = class LoggerMiddleware {
    constructor(logger) {
        this.logger = logger;
    }
    use(req, res, next) {
        const startTime = Date.now();
        const { ip, method } = req;
        const userAgent = req.get('user-agent') || (0, uuid_1.v4)();
        res.on('finish', () => {
            const endTime = Date.now();
            const responseTime = `${endTime - startTime} ms`;
            const { statusCode, statusMessage } = res;
            const contentLength = res.get('content-length');
            const level = statusCode >= 400 ? 'error' : 'info';
            this.logger.logData({
                method,
                body: req.body,
                phone: req.user?.mobile || '',
                role: req.headers.role || null,
                path: req.originalUrl,
                statusCode,
                statusMessage,
                responseTime,
                ip,
                content_length: contentLength,
                user_agent: userAgent,
            });
        });
        next();
    }
};
exports.LoggerMiddleware = LoggerMiddleware;
exports.LoggerMiddleware = LoggerMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_service_1.LoggerService])
], LoggerMiddleware);
//# sourceMappingURL=logger.middleware.js.map
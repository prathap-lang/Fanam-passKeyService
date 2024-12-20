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
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const utils_1 = require("../utils");
let AllExceptionsFilter = class AllExceptionsFilter {
    constructor(httpAdapterHost) {
        this.httpAdapterHost = httpAdapterHost;
    }
    catch(exception, host) {
        const { httpAdapter } = this.httpAdapterHost;
        (0, utils_1.printLog)('Exception Caught in AllExceptionFilter: ', exception);
        const { message = 'Something went wrong', error, is_encrypted = false, } = exception?.getResponse() || {};
        const ctx = host.switchToHttp();
        const responseBody = {
            status_code: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            status: 'Error!!!',
            message,
            result: null,
            error,
            is_encrypted,
        };
        if (exception instanceof common_1.BadRequestException)
            responseBody.status_code = common_1.HttpStatus.BAD_REQUEST;
        else if (exception instanceof common_1.NotFoundException)
            responseBody.status_code = common_1.HttpStatus.NOT_FOUND;
        else if (exception instanceof common_1.UnauthorizedException)
            responseBody.status_code = common_1.HttpStatus.UNAUTHORIZED;
        else if (exception instanceof common_1.ForbiddenException)
            responseBody.status_code = common_1.HttpStatus.FORBIDDEN;
        else if (exception.response)
            responseBody.status_code = exception.response.status_code;
        httpAdapter.reply(ctx.getResponse(), responseBody, responseBody.status_code);
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [core_1.HttpAdapterHost])
], AllExceptionsFilter);
//# sourceMappingURL=all-exception.filter.js.map
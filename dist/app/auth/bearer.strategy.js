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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BearerStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const fireBase_service_1 = require("app/firebase/fireBase.service");
const passport_http_bearer_1 = require("passport-http-bearer");
const utils_1 = require("../../utils");
const user_service_1 = require("../user/user.service");
let BearerStrategy = class BearerStrategy extends (0, passport_1.PassportStrategy)(passport_http_bearer_1.Strategy) {
    constructor(userService, firebase) {
        super({ passReqToCallback: true });
        this.userService = userService;
        this.firebase = firebase;
    }
    async validate(token) {
        try {
            const data = await this.firebase.verifyToken(token);
            return data.phone_number;
        }
        catch (error) {
            (0, utils_1.printLog)(error);
            throw new common_1.BadRequestException('Invalid token');
        }
    }
};
exports.BearerStrategy = BearerStrategy;
exports.BearerStrategy = BearerStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService, typeof (_a = typeof fireBase_service_1.FirebaseService !== "undefined" && fireBase_service_1.FirebaseService) === "function" ? _a : Object])
], BearerStrategy);
//# sourceMappingURL=bearer.strategy.js.map
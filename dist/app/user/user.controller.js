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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../decorators");
const utils_1 = require("../../utils");
const dto_1 = require("./dto");
const user_entity_1 = require("./user.entity");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async findUserProfile(user) {
        const result = await this.userService.getProfile(user);
        return new utils_1.AppResponse(result, 'Fetched User Profile Successfully');
    }
    async syncUser(body, user) {
        const result = await this.userService.syncUser(user, body);
        return new utils_1.AppResponse(result, 'Updated User Successfully');
    }
    async findOne(user_id) {
        const user = await this.userService.findOne(user_id);
        return new utils_1.AppResponse(user, 'Fetched User Detail Successfully');
    }
    async update(user_id, body) {
        const user = await this.userService.update(user_id, body);
        return new utils_1.AppResponse(user, 'Updated User Successfully');
    }
};
exports.UserController = UserController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get User Profile' }),
    (0, swagger_1.ApiOkResponse)({ type: user_entity_1.EntityGetUser }),
    (0, common_1.Get)('me'),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.BaseResUser]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findUserProfile", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Sync User' }),
    (0, swagger_1.ApiOkResponse)({ type: user_entity_1.EntityUpdateUser }),
    (0, common_1.Put)('sync'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateUserDto,
        user_entity_1.BaseResUser]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "syncUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get User by id' }),
    (0, swagger_1.ApiOkResponse)({ type: user_entity_1.EntityGetUser }),
    (0, common_1.Get)(':user_id'),
    __param(0, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update User' }),
    (0, swagger_1.ApiOkResponse)({ type: user_entity_1.EntityUpdateUser }),
    (0, common_1.Put)(':user_id'),
    __param(0, (0, common_1.Param)('user_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, swagger_1.ApiTags)('User'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBadRequestResponse)({
        type: utils_1.EntityErrorResponse,
    }),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map
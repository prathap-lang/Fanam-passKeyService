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
exports.WithDtoAddress = exports.WithEntityAddress = void 0;
const swagger_1 = require("@nestjs/swagger");
const entity_1 = require("../app/location/entity");
const class_validator_1 = require("class-validator");
const utils_1 = require("../utils");
function WithEntityAddress(Base) {
    class EntityBaseAddress extends Base {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'adyar, Chennai' }),
        __metadata("design:type", String)
    ], EntityBaseAddress.prototype, "address", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ type: entity_1.BaseResCountry }),
        __metadata("design:type", entity_1.BaseResCountry)
    ], EntityBaseAddress.prototype, "country", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'Tamil nadu' }),
        __metadata("design:type", String)
    ], EntityBaseAddress.prototype, "state", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'Chennai' }),
        __metadata("design:type", String)
    ], EntityBaseAddress.prototype, "city", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ example: '600001' }),
        __metadata("design:type", String)
    ], EntityBaseAddress.prototype, "zip_code", void 0);
    return EntityBaseAddress;
}
exports.WithEntityAddress = WithEntityAddress;
function WithDtoAddress(Base) {
    class DtoBaseAddress extends Base {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ example: '2nd street, near A2b' }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.Length)(utils_1.MIN_ADDRESS_LINE_LENGTH, utils_1.MAX_ADDRESS_LINE_LENGTH),
        __metadata("design:type", String)
    ], DtoBaseAddress.prototype, "address_line_1", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'rs road, adyar' }),
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.Length)(utils_1.MIN_ADDRESS_LINE_LENGTH, utils_1.MAX_ADDRESS_LINE_LENGTH),
        __metadata("design:type", String)
    ], DtoBaseAddress.prototype, "address_line_2", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 101 }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsNumber)(),
        __metadata("design:type", Number)
    ], DtoBaseAddress.prototype, "country_id", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 4035 }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsNumber)(),
        __metadata("design:type", Number)
    ], DtoBaseAddress.prototype, "state_id", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 131517 }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsNumber)(),
        __metadata("design:type", Number)
    ], DtoBaseAddress.prototype, "city_id", void 0);
    __decorate([
        (0, swagger_1.ApiProperty)({ example: '600001' }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        __metadata("design:type", String)
    ], DtoBaseAddress.prototype, "zip_code", void 0);
    return DtoBaseAddress;
}
exports.WithDtoAddress = WithDtoAddress;
//# sourceMappingURL=address.mixin.js.map
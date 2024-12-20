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
exports.EntityDeleteFile = exports.EntityDeleteAttachment = exports.EntityAttachment = void 0;
const swagger_1 = require("@nestjs/swagger");
const utils_1 = require("../../utils");
class EntityAttachment {
}
exports.EntityAttachment = EntityAttachment;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '47e12e99-caeb-43cb-a9b9-fbb070f62c1b' }),
    __metadata("design:type", String)
], EntityAttachment.prototype, "attachment_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://fanampay.blob.core.windows.net/invoice/47e12e99-caeb-43cb-a9b9-fbb070f62c1b.png?sv=2024-05-04&st=2024-07-04T06%3A53%3A00Z&se=2024-07-04T07%3A03%3A00Z&sr=c&sp=r&sig=Euyg7q065%2B2nU%2F7EGyJC0hK9qs3D8FFw4oRFM5yPT6s%3D',
    }),
    __metadata("design:type", String)
], EntityAttachment.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Image' }),
    __metadata("design:type", String)
], EntityAttachment.prototype, "mime", void 0);
class EntityDeleteAttachment {
}
exports.EntityDeleteAttachment = EntityDeleteAttachment;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '47e12e99-caeb-43cb-a9b9-fbb070f62c1b' }),
    __metadata("design:type", String)
], EntityDeleteAttachment.prototype, "attachment_id", void 0);
class EntityDeleteFile extends utils_1.BaseResponse {
}
exports.EntityDeleteFile = EntityDeleteFile;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: EntityDeleteAttachment,
    }),
    __metadata("design:type", EntityDeleteAttachment)
], EntityDeleteFile.prototype, "result", void 0);
//# sourceMappingURL=file-upload.entity.js.map
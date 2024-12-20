"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMimeType = exports.formatFileSize = exports.printLog = exports.Mixin = void 0;
function Mixin(Base) {
    class MixedClass extends Base {
    }
    return MixedClass;
}
exports.Mixin = Mixin;
function printLog(...args) {
    const key = `>>>>>>>>>>>>>>>>`;
    console.log(key, ...args);
}
exports.printLog = printLog;
function formatFileSize(size) {
    let formattedSize = '';
    if (size > 1e9)
        formattedSize = `${size / 1e9}MB`;
    if (size > 1e6)
        formattedSize = `${size / 1e6}MB`;
    if (size > 1e3)
        formattedSize = `${size / 1e3}KB`;
    return formattedSize;
}
exports.formatFileSize = formatFileSize;
function getMimeType(fileMime) {
    let mime = 'Image';
    if (fileMime.includes('video'))
        mime = 'Video';
    else if (fileMime.includes('pdf'))
        mime = 'Pdf';
    else if (fileMime.includes('doc'))
        mime = 'Document';
    return mime;
}
exports.getMimeType = getMimeType;
//# sourceMappingURL=common.service.js.map
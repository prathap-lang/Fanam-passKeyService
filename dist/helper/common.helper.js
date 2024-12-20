"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutAll = exports.logout = exports.isBlackListed = exports.removeRefreshToken = exports.addRefreshToken = void 0;
const common_1 = require("@nestjs/common");
async function addRefreshToken(prisma, user_id, accessToken, refreshToken) {
    const existingUser = await prisma.user.findUnique({
        where: { user_id },
    });
    if (!existingUser) {
        throw new Error(`User not found`);
    }
    const tokens = existingUser.token;
    const accessTokens = existingUser.access_token;
    const updatedRefreshTokenArray = [];
    const updatedAccessTokenArray = [];
    if (tokens?.length) {
        for (const token of tokens) {
            updatedRefreshTokenArray.push(token);
        }
    }
    if (accessTokens?.length) {
        for (const token of accessTokens) {
            updatedAccessTokenArray.push(token);
        }
    }
    updatedRefreshTokenArray.push(refreshToken);
    updatedAccessTokenArray.push(accessToken);
    return await prisma.user.update({
        where: { user_id },
        data: {
            token: updatedRefreshTokenArray,
            access_token: updatedAccessTokenArray,
        },
    });
}
exports.addRefreshToken = addRefreshToken;
async function removeRefreshToken(prisma, user_id, refreshToken) {
    const existingUser = await prisma.user.findUnique({ where: { user_id } });
    if (!existingUser) {
        throw new common_1.NotFoundException('Invalid User');
    }
    const tokens = existingUser.token;
    const updatedTokenArray = tokens.filter((token) => token !== refreshToken);
    return await prisma.user.update({
        where: { user_id },
        data: { token: updatedTokenArray },
    });
}
exports.removeRefreshToken = removeRefreshToken;
async function isBlackListed(prisma, req) {
    const user = await prisma.user.findUnique({
        where: { user_id: req.user.user_id },
    });
    const token = Array.isArray(user.invalidToken)
        ? user.invalidToken
        : [];
    if (token.includes(req.headers.authorization?.split(' ')[1])) {
        return true;
    }
    else {
        return false;
    }
}
exports.isBlackListed = isBlackListed;
async function logout(prisma, req, input) {
    const existingUser = await prisma.user.findUnique({
        where: { user_id: req.user.user_id },
    });
    if (!existingUser) {
        throw new Error(`User not found`);
    }
    const tokens = existingUser.invalidToken;
    const refreshTokens = existingUser.token;
    const accessTokens = existingUser.access_token;
    const updatedTokenArray = [];
    const updatedAccessTokenArray = [];
    const updatedRefreshTokenArray = [];
    if (tokens?.length) {
        for (const token of tokens) {
            updatedTokenArray.push(token);
        }
    }
    if (accessTokens?.length) {
        for (const token of accessTokens) {
            if (token !== req.headers.authorization?.split(' ')[1]) {
                updatedAccessTokenArray.push(token);
            }
        }
    }
    if (refreshTokens?.length) {
        for (const token of refreshTokens) {
            if (token !== input.refreshToken) {
                updatedRefreshTokenArray.push(token);
            }
        }
    }
    updatedTokenArray.push(req.headers.authorization?.split(' ')[1], input.refreshToken);
    const data = {
        invalidToken: updatedTokenArray,
        access_token: updatedAccessTokenArray,
        token: updatedRefreshTokenArray,
    };
    return await prisma.user.update({
        where: { user_id: req.user.user_id },
        data,
    });
}
exports.logout = logout;
async function logoutAll(prisma, req) {
    const existingUser = await prisma.user.findUnique({
        where: { user_id: req.user.user_id },
    });
    if (!existingUser) {
        throw new Error(`User not found`);
    }
    const invalidTokens = existingUser.invalidToken;
    const refreshTokens = existingUser.token;
    const accessTokens = existingUser.access_token;
    const updatedInvalidTokens = [];
    if (invalidTokens?.length) {
        for (const token of invalidTokens) {
            updatedInvalidTokens.push(token);
        }
    }
    if (refreshTokens?.length) {
        for (const token of refreshTokens) {
            updatedInvalidTokens.push(token);
        }
    }
    if (accessTokens?.length) {
        for (const token of accessTokens) {
            updatedInvalidTokens.push(token);
        }
    }
    return await prisma.user.update({
        where: { user_id: req.user.user_id },
        data: {
            invalidToken: updatedInvalidTokens,
            access_token: [],
            token: [],
        },
    });
}
exports.logoutAll = logoutAll;
//# sourceMappingURL=common.helper.js.map
import { NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';





export async function addRefreshToken(
  prisma: PrismaService,
  user_id: string,
  accessToken: string,
  refreshToken: string,
) {
  const existingUser = await prisma.user.findUnique({
    where: { user_id },
  });
  if (!existingUser) {
    throw new Error(`User not found`);
  }
  const tokens = existingUser.token as Prisma.JsonArray;
  const accessTokens = existingUser.access_token as Prisma.JsonArray;
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
      token: updatedRefreshTokenArray as Prisma.JsonArray,
      access_token: updatedAccessTokenArray as Prisma.JsonArray,
    },
  });
}

export async function removeRefreshToken(
  prisma: PrismaService,
  user_id: string,
  refreshToken: string,
) {
  const existingUser = await prisma.user.findUnique({ where: { user_id } });
  if (!existingUser) {
    throw new NotFoundException('Invalid User');
  }
  const tokens = existingUser.token as Prisma.JsonArray;
  const updatedTokenArray = tokens.filter((token) => token !== refreshToken);
  return await prisma.user.update({
    where: { user_id },
    data: { token: updatedTokenArray as Prisma.JsonArray },
  });
}

export async function isBlackListed(prisma: PrismaService, req) {
  const user = await prisma.user.findUnique({
    where: { user_id: req.user.user_id },
  });
  const token = Array.isArray(user.invalidToken)
    ? (user.invalidToken as Prisma.JsonArray)
    : [];
  if (token.includes(req.headers.authorization?.split(' ')[1])) {
    return true;
  } else {
    return false;
  }
}

export async function logout(prisma: PrismaService, req, input: any) {
  const existingUser = await prisma.user.findUnique({
    where: { user_id: req.user.user_id },
  });
  if (!existingUser) {
    throw new Error(`User not found`);
  }
  const tokens = existingUser.invalidToken as Prisma.JsonArray;
  const refreshTokens = existingUser.token as Prisma.JsonArray;
  const accessTokens = existingUser.access_token as Prisma.JsonArray;
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
  updatedTokenArray.push(
    req.headers.authorization?.split(' ')[1],
    input.refreshToken,
  );
  const data: Prisma.UserUpdateInput = {
    invalidToken: updatedTokenArray as Prisma.JsonArray,
    access_token: updatedAccessTokenArray as Prisma.JsonArray,
    token: updatedRefreshTokenArray as Prisma.JsonArray,
  };

  return await prisma.user.update({
    where: { user_id: req.user.user_id },
    data,
  });
}

export async function logoutAll(prisma: PrismaService, req) {
  const existingUser = await prisma.user.findUnique({
    where: { user_id: req.user.user_id },
  });
  if (!existingUser) {
    throw new Error(`User not found`);
  }
  const invalidTokens = existingUser.invalidToken as Prisma.JsonArray;
  const refreshTokens = existingUser.token as Prisma.JsonArray;
  const accessTokens = existingUser.access_token as Prisma.JsonArray;
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
      invalidToken: updatedInvalidTokens as Prisma.JsonArray,
      access_token: [] as Prisma.JsonArray,
      token: [] as Prisma.JsonArray,
    },
  });
}

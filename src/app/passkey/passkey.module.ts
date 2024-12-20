import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { PasskeyController } from './passkey.controller';
import { PasskeyService } from './passkey.service';

@Module({
  controllers: [PasskeyController],
  providers: [PasskeyService, PrismaService, ConfigService, JwtService],
})
export class PasskeyModule {}

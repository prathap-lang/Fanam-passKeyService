import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import {  APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { TransformInterceptor } from 'interceptors';
import { PrismaModule } from 'prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PasskeyModule } from './passkey/passkey.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_TOKEN_SECRET,
      signOptions: { algorithm: 'HS512', expiresIn: '1d' },
    }),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    UserModule,
    PrismaModule,
    PasskeyModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    AppService,
  ],
})
export class AppModule {}

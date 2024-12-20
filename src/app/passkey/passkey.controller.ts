import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BaseResUser } from 'app/user/user.entity';
import { CurrentUser } from 'decorators';
import { AppResponse, EntityErrorResponse } from 'utils';
import { PasskeyService } from './passkey.service';

@ApiTags('passkey')
@ApiBearerAuth()
@ApiBadRequestResponse({
  type: EntityErrorResponse,
})
@Controller('passkey')
export class PasskeyController {
  constructor(private readonly passkeyService: PasskeyService) {}

  @Get('register-start')
  async startRegistration(
  // @CurrentUser() user: BaseResUser
  @Req() req:any
) {
    const options = await this.passkeyService.generateRegistrationOptions(req);
    return new AppResponse(options, 'Registration initiated Successfully');
  }

  @Post('register-finish')
  async finishRegistration(
    @Body() data: any,
    // @CurrentUser() user: BaseResUser,
    @Req() req:any
  ) {
    const verified =
      await this.passkeyService.verifyRegistrationResponseHandler(data, req);
    return new AppResponse(verified, 'Registration Completed Successfully');
  }

  @Get('login-start') 
  async startAuthentication(@Query('credentialId') credentialId: string) {
    const options =
      await this.passkeyService.generateAuthenticationOptions(credentialId);
    return new AppResponse(options, 'Authentication Initiated Successfully');
  }

  @Post('login-finish')
  async finishAuthentication(@Body() data: any) {
    const verified =
      await this.passkeyService.verifyAuthenticationResponse(data);
    return new AppResponse(verified, 'Authentication Completed Successfully');
  }
}

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  generateAuthenticationOptions,
  generateRegistrationOptions,
  VerifiedAuthenticationResponse,
  verifyAuthenticationResponse,
  VerifyAuthenticationResponseOpts,
  verifyRegistrationResponse,
  VerifyRegistrationResponseOpts,
} from '@simplewebauthn/server';
import {
  AuthenticatorTransportFuture,
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
} from '@simplewebauthn/server/script/deps';
import { BaseResUser } from 'app/user/user.entity';
import { addRefreshToken } from 'helper/common.helper';
import { PrismaService } from 'prisma/prisma.service';


@Injectable()
export class PasskeyService {
  private rpName: string;
  private rpID: string;
  private origin: string;

  constructor(
    private configService: ConfigService,
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {
    this.rpName = this.configService.get('RP_NAME') || 'fanamPay';
    this.rpID = this.configService.get('RP_ID') || process.env.RP_ID;
    this.origin = this.configService.get('ORIGIN') || process.env.ORIGIN;
  }

  async generateRegistrationOptions(req: any) {
    try {
      const encoder = new TextEncoder();
      const userIdUint8Array = encoder.encode(req.user_id);
      const user = await this.prisma.user.findUnique({
        where: { user_id: req.user_id },
      });
      /*const userPasskeys = await this.prisma.passkey.findMany({
        where: { user_id: user.user_id },
      });*/
    
      const opt: PublicKeyCredentialCreationOptionsJSON =
        await generateRegistrationOptions({
          rpName: this.rpName,
          rpID: this.rpID,
          userID: userIdUint8Array,
          userName: user.first_name,
          attestationType: 'direct',
          /*excludeCredentials: userPasskeys.map((passkey) => ({
            id: passkey.cred_id,
            type: 'public-key',
          })),*/
          authenticatorSelection: {
            residentKey: 'preferred',
            userVerification: 'preferred',
            authenticatorAttachment: 'platform',
          },
          supportedAlgorithmIDs: [-7, -257],
        });
      return opt;
    } catch (error) {
      console.log(error, '<<<<<<<<<<< error');
    }
  }

  async verifyRegistrationResponseHandler(data: any, req: any) {
    try {
      const userPasskeys = await this.prisma.passkey.findMany({
        where: { user_id: req.user_id },
      });
      const cred_id = userPasskeys.map((it) => {
        return it.cred_id;
      });
      const { challenge } = data;
      delete data.challenge;
      const verification: VerifyRegistrationResponseOpts = {
        response: data,
        expectedChallenge: challenge,
        expectedOrigin: this.origin,
        expectedRPID: this.rpID,
        requireUserVerification: false,
      };
      const result = await verifyRegistrationResponse(verification);
      if (!result) {
        throw new BadRequestException(`verification failed`);
      }
      if (cred_id.includes(result.registrationInfo.credentialID)) {
        throw new BadRequestException('Device Already Registered');
      }
      await this.prisma.passkey.create({
        data: {
          user: { connect: { user_id: req.user_id } },
          cred_id: result.registrationInfo.credentialID,
          counter: result.registrationInfo.counter,
          cred_public_key: JSON.stringify(
            result.registrationInfo.credentialPublicKey,
          ),
          transports: data.response.transports,
          webauth_user_id: req.user_id,
          device_type: result.registrationInfo.credentialDeviceType,
          credential_type: result.registrationInfo.credentialType,
        },
      });
      const resultData = {
        verified: result.verified,
        cred_id: result.registrationInfo.credentialID,
      };
      return resultData;
    } catch (err) {
      console.error('Verification failed:', err);
      throw err;
    }
  }

  async generateAuthenticationOptions(credentialId: string) {
    const userPasskey = await this.prisma.passkey.findUnique({
      where: { cred_id: credentialId },
      include: { user: { include: { passkey: true } } },
    });
    if (!userPasskey) {
      throw new BadRequestException('No User Passkey Data Found');
    }
    const options: PublicKeyCredentialRequestOptionsJSON =
      await generateAuthenticationOptions({
        rpID: this.rpID,
        userVerification: 'preferred',
        allowCredentials: userPasskey.user.passkey.map((cred) => ({
          id: cred.cred_id,
          transports: cred.transports as AuthenticatorTransportFuture[],
        })),
      });
    return options;
  }

  async verifyAuthenticationResponse(data: any) {
    const userPasskey = await this.prisma.passkey.findFirst({
      where: { cred_id: data.id },
      include: { user: { select: { user_id: true } } },
    });
    if (!userPasskey) {
      throw new BadRequestException('No User Passkey Data Found');
    }
    let verification: VerifiedAuthenticationResponse;
    const credentialPublicKeyObject = JSON.parse(
      userPasskey.cred_public_key,
    ) as Record<string, number>;
    const credentialPublicKeyBuffer = Buffer.from(
      Object.values(credentialPublicKeyObject),
    );
    try {
      const opts: VerifyAuthenticationResponseOpts = {
        response: data,
        expectedChallenge: data.challenge,
        expectedOrigin: this.origin,
        expectedRPID: this.rpID,
        authenticator: {
          credentialID: userPasskey.cred_id,
          credentialPublicKey: credentialPublicKeyBuffer,
          counter: userPasskey.counter,
          transports: userPasskey.transports as AuthenticatorTransportFuture[],
        },
        requireUserVerification: false,
      };
      // const { user_id } = userPasskey.user;
      verification = await verifyAuthenticationResponse(opts);
      if (verification.verified) {
        // const tokens = {
        //   access_token: this.jwtService.sign(
        //     { user_id },
        //     {
        //       secret: process.env.JWT_TOKEN_SECRET,
        //       expiresIn: '1d',
        //     },
        //   ),
        //   refresh_token: this.jwtService.sign(
        //     { user_id },
        //     {
        //       secret: process.env.JWT_TOKEN_SECRET,
        //       expiresIn: '7d',
        //     },
        //   ),
        // };
        // await addRefreshToken(
        //   this.prisma,
        //   user_id,
        //   tokens.access_token,
        //   tokens.refresh_token,
        // );
        return verification;
      } else {
        throw new UnauthorizedException('Authentication Failed');
      }
    } catch (error) {
      console.error(error.message);
    }
  }
}

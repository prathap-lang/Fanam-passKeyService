import { JwtService } from '@nestjs/jwt';
import { UserService } from 'app/user/user.service';
import { PrismaService } from 'prisma/prisma.service';
import { ForgotPinDto, LoginDto, SignUpDto } from './dto/login.dto';
export declare class AuthService {
    private userService;
    private jwtService;
    private prisma;
    constructor(userService: UserService, jwtService: JwtService, prisma: PrismaService);
    login({ phone_no, pin }: LoginDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    signUp({ first_name, last_name, email, phone_no, newPin, confirmPin, }: SignUpDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    forgotPin({ newPin, confirmPin, phone_no }: ForgotPinDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    refreshToken(token: string, secret: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    validateNewPassword(user_id: string, newPassword: string): Promise<boolean>;
    verifyToken(token: string, secret: string): Promise<any>;
    findOne(bank_name: string): Promise<{
        bank_name: string;
        client_id: string;
        client_secret: string;
    }>;
    createTokenWithBank({ code, bank_id }: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}

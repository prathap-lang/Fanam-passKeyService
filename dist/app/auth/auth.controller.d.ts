import { IRequest } from 'model';
import { PrismaService } from 'prisma/prisma.service';
import { AppResponse } from 'utils';
import { AuthService } from './auth.service';
import { CreateHandshakeWithBankDto, ForgotPinDto, LoginDto, LogOutDto, SignUpDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    private readonly prisma;
    constructor(authService: AuthService, prisma: PrismaService);
    login(input: LoginDto): Promise<AppResponse<{
        access_token: string;
        refresh_token: string;
    }>>;
    signUp(input: SignUpDto): Promise<AppResponse<{
        access_token: string;
        refresh_token: string;
    }>>;
    forgotPin(input: ForgotPinDto): Promise<AppResponse<{
        access_token: string;
        refresh_token: string;
    }>>;
    refreshToken(req: IRequest): Promise<AppResponse<{
        access_token: string;
        refresh_token: string;
    }>>;
    logOut(req: any, input: LogOutDto): Promise<AppResponse<any>>;
    logOutFromAllDevices(req: any): Promise<AppResponse<any>>;
    findOne(bank_name: string): Promise<AppResponse<{
        bank_name: string;
        client_id: string;
        client_secret: string;
    }>>;
    createTokenWithBank(body: CreateHandshakeWithBankDto): Promise<AppResponse<{
        access_token: string;
        refresh_token: string;
    }>>;
}

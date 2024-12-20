import { AppResponse } from 'utils';
import { CreateHandshakeWithBankDto } from './dto/handshake.dto';
import { HandshakeService } from './handshake.service';
export declare class HandshakeController {
    private readonly handshakeService;
    constructor(handshakeService: HandshakeService);
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

import { ConfigService } from '@nestjs/config';
import { _IMail } from 'utils';
export declare class EmailService {
    private readonly config;
    constructor(config: ConfigService);
    send(input: _IMail): Promise<void>;
}

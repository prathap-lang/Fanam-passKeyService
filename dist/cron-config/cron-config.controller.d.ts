import { CronConfigService } from './cron-config.service';
export declare class CronConfigController {
    private readonly cronConfigService;
    constructor(cronConfigService: CronConfigService);
    tokenRemoval(): Promise<void>;
}

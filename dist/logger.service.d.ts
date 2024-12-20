export declare class LoggerService {
    error(arg0: string, arg1: {
        ip: any;
        userAgent: any;
        body: any;
    }): void;
    private readonly months;
    private readonly date;
    private readonly logger;
    constructor();
    logData(data: any): void;
}

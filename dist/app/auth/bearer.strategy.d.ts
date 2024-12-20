import { FirebaseService } from 'app/firebase/fireBase.service';
import { Strategy } from 'passport-http-bearer';
import { UserService } from '../user/user.service';
declare const BearerStrategy_base: new (...args: any[]) => Strategy<import("passport-http-bearer").VerifyFunctions>;
export declare class BearerStrategy extends BearerStrategy_base {
    private userService;
    private firebase;
    constructor(userService: UserService, firebase: FirebaseService);
    validate(token: string): Promise<any>;
}
export {};

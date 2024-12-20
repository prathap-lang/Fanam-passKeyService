import { BaseResUser } from 'app/user/user.entity';
import { PrismaService } from 'prisma/prisma.service';
export declare class RazorpayService {
    private readonly prisma;
    private readonly razorpay;
    constructor(prisma: PrismaService);
    createPayment(amount: number): Promise<import("razorpay/dist/types/orders").Orders.RazorpayOrder>;
    capturePayment(paymentId: string, amount: number, currency?: string): Promise<import("razorpay/dist/types/payments").Payments.RazorpayPayment>;
    createRazorpayOrder(amount: number): Promise<import("razorpay/dist/types/orders").Orders.RazorpayOrder>;
    createRefund(transaction_id: string, user: BaseResUser): Promise<any>;
    automaticCreateRefund(order_id: string): Promise<any>;
}

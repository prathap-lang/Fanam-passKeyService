import { PrismaClient } from '@prisma/client';
export declare function getRole(prisma: PrismaClient, role: string): Promise<string>;

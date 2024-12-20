/*
  Warnings:

  - The values [Payment_pending,Payment_success,Payment_failure,Payment_canceled,Payment_returned] on the enum `EnumOrderStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EnumOrderStatus_new" AS ENUM ('Payment_initiated', 'Payment_in_transition', 'Payment_failed', 'Payment_rejected', 'Refund_initiated', 'Refund_in_progress', 'Refunded_successfully', 'Refund_failed', 'Transaction_rejected', 'Transaction_canceled', 'Transaction_returned', 'Transaction_pending', 'Transaction_success', 'Transaction_failed');
ALTER TABLE "order" ALTER COLUMN "order_status" TYPE "EnumOrderStatus_new" USING ("order_status"::text::"EnumOrderStatus_new");
ALTER TABLE "payment" ALTER COLUMN "status" TYPE "EnumOrderStatus_new" USING ("status"::text::"EnumOrderStatus_new");
ALTER TABLE "log" ALTER COLUMN "status" TYPE "EnumOrderStatus_new" USING ("status"::text::"EnumOrderStatus_new");
ALTER TYPE "EnumOrderStatus" RENAME TO "EnumOrderStatus_old";
ALTER TYPE "EnumOrderStatus_new" RENAME TO "EnumOrderStatus";
DROP TYPE "EnumOrderStatus_old";
COMMIT;

-- AlterEnum
ALTER TYPE "EnumPurpose" ADD VALUE 'Goods_purchase';

-- DropIndex
DROP INDEX "recipient_bank_account_account_no_key";

-- AlterTable
ALTER TABLE "attachment" ADD COLUMN     "container_name" TEXT;

-- AlterTable
ALTER TABLE "beneficiary" ADD COLUMN     "notes" TEXT;

-- AlterTable
ALTER TABLE "country" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "payment" ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "recipient" ADD COLUMN     "is_send_email" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "recipient_bank_account" ADD COLUMN     "bsb_code" TEXT,
ALTER COLUMN "swift_code" DROP NOT NULL;

-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "expiration_time" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "transfertime" ADD COLUMN     "duration_time" INTEGER;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "access_token" JSONB,
ADD COLUMN     "invalidToken" JSONB,
ADD COLUMN     "token" JSONB;

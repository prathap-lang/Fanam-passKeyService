/*
  Warnings:

  - The values [routing] on the enum `EnumBankCodeType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `source_amount` on the `transaction` table. All the data in the column will be lost.
  - The primary key for the `transfertime` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `charges` on the `transfertime` table. All the data in the column will be lost.
  - You are about to drop the column `country_currency` on the `transfertime` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `transfertime` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `transfertime` table. All the data in the column will be lost.
  - Added the required column `country_id` to the `transfertime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fx_rate_network` to the `transfertime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mark_up_rate` to the `transfertime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `other_fees` to the `transfertime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sla_timing_max` to the `transfertime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sla_timing_min` to the `transfertime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transfer_network` to the `transfertime` table without a default value. This is not possible if the table is not empty.
  - The required column `transfer_time_id` was added to the `transfertime` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "EnumTransferNetwork" AS ENUM ('Visa', 'Master_card');

-- AlterEnum
BEGIN;
CREATE TYPE "EnumBankCodeType_new" AS ENUM ('Sort', 'Swift', 'BSB', 'Routing', 'IFSC', 'IBAN');
ALTER TABLE "recipient_bank_account" ALTER COLUMN "bank_code_type" TYPE "EnumBankCodeType_new" USING ("bank_code_type"::text::"EnumBankCodeType_new");
ALTER TYPE "EnumBankCodeType" RENAME TO "EnumBankCodeType_old";
ALTER TYPE "EnumBankCodeType_new" RENAME TO "EnumBankCodeType";
DROP TYPE "EnumBankCodeType_old";
COMMIT;

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "EnumOrderStatus" ADD VALUE 'Payment_in_transition';
ALTER TYPE "EnumOrderStatus" ADD VALUE 'Payment_rejected';
ALTER TYPE "EnumOrderStatus" ADD VALUE 'Payment_canceled';
ALTER TYPE "EnumOrderStatus" ADD VALUE 'Payment_returned';

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "client_reference_id" TEXT,
ADD COLUMN     "fx_conversion_rate" TEXT,
ADD COLUMN     "initiating_party_id" TEXT,
ADD COLUMN     "payout_id" TEXT,
ADD COLUMN     "payout_speed" TEXT,
ADD COLUMN     "proposal_id" TEXT;

-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "source_amount",
ADD COLUMN     "exchange_amount" DOUBLE PRECISION,
ADD COLUMN     "final_amount" DOUBLE PRECISION,
ADD COLUMN     "is_checkout" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "master_card_proposal_id" TEXT,
ADD COLUMN     "master_card_transaction_id" TEXT,
ADD COLUMN     "other_fee" DOUBLE PRECISION,
ADD COLUMN     "transfer_time_id" TEXT,
ADD COLUMN     "visa_quote_id" TEXT;

-- AlterTable
ALTER TABLE "transfertime" DROP CONSTRAINT "transfertime_pkey",
DROP COLUMN "charges",
DROP COLUMN "country_currency",
DROP COLUMN "id",
DROP COLUMN "type",
ADD COLUMN     "country_id" INTEGER NOT NULL,
ADD COLUMN     "fx_rate_network" "EnumTransferNetwork" NOT NULL,
ADD COLUMN     "is_exclude_other_fees" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_recommended" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "mark_up_rate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "other_fees" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sla_timing_max" INTEGER NOT NULL,
ADD COLUMN     "sla_timing_min" INTEGER NOT NULL,
ADD COLUMN     "transfer_network" "EnumTransferNetwork" NOT NULL,
ADD COLUMN     "transfer_time_id" TEXT NOT NULL,
ADD CONSTRAINT "transfertime_pkey" PRIMARY KEY ("transfer_time_id");

-- DropEnum
DROP TYPE "EnumTransfercharge";

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_transfer_time_id_fkey" FOREIGN KEY ("transfer_time_id") REFERENCES "transfertime"("transfer_time_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transfertime" ADD CONSTRAINT "transfertime_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("country_id") ON DELETE RESTRICT ON UPDATE CASCADE;

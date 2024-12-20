/*
  Warnings:

  - You are about to drop the column `business_type` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `KycDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `attachment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `beneficiary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `crossborderorder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `crossborderpayment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `log` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `recipient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `recipient_bank_account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transfertime` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "EnumRelationship" ADD VALUE 'Others';

-- DropForeignKey
ALTER TABLE "KycDetail" DROP CONSTRAINT "KycDetail_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "KycDetail" DROP CONSTRAINT "KycDetail_issued_country_id_fkey";

-- DropForeignKey
ALTER TABLE "attachment" DROP CONSTRAINT "attachment_recipient_id_fkey";

-- DropForeignKey
ALTER TABLE "attachment" DROP CONSTRAINT "attachment_sender_kyc_detail_id_fkey";

-- DropForeignKey
ALTER TABLE "attachment" DROP CONSTRAINT "attachment_transaction_id_fkey";

-- DropForeignKey
ALTER TABLE "attachment" DROP CONSTRAINT "attachment_user_id_fkey";

-- DropForeignKey
ALTER TABLE "beneficiary" DROP CONSTRAINT "beneficiary_city_id_fkey";

-- DropForeignKey
ALTER TABLE "beneficiary" DROP CONSTRAINT "beneficiary_country_id_fkey";

-- DropForeignKey
ALTER TABLE "beneficiary" DROP CONSTRAINT "beneficiary_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "beneficiary" DROP CONSTRAINT "beneficiary_state_id_fkey";

-- DropForeignKey
ALTER TABLE "crossborderorder" DROP CONSTRAINT "crossborderorder_userId_fkey";

-- DropForeignKey
ALTER TABLE "crossborderpayment" DROP CONSTRAINT "crossborderpayment_crossborderorderid_fkey";

-- DropForeignKey
ALTER TABLE "log" DROP CONSTRAINT "log_order_id_fkey";

-- DropForeignKey
ALTER TABLE "log" DROP CONSTRAINT "log_userId_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_payment_id_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_transaction_id_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_user_id_fkey";

-- DropForeignKey
ALTER TABLE "recipient" DROP CONSTRAINT "recipient_city_id_fkey";

-- DropForeignKey
ALTER TABLE "recipient" DROP CONSTRAINT "recipient_country_id_fkey";

-- DropForeignKey
ALTER TABLE "recipient" DROP CONSTRAINT "recipient_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "recipient" DROP CONSTRAINT "recipient_id_issued_country_id_fkey";

-- DropForeignKey
ALTER TABLE "recipient" DROP CONSTRAINT "recipient_state_id_fkey";

-- DropForeignKey
ALTER TABLE "recipient_bank_account" DROP CONSTRAINT "recipient_bank_account_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "recipient_bank_account" DROP CONSTRAINT "recipient_bank_account_recipient_id_fkey";

-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_beneficiary_id_fkey";

-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_destination_country_id_fkey";

-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_recipient_id_fkey";

-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_source_country_id_fkey";

-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_transfer_time_id_fkey";

-- DropForeignKey
ALTER TABLE "transfertime" DROP CONSTRAINT "transfertime_country_id_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "business_type";

-- DropTable
DROP TABLE "KycDetail";

-- DropTable
DROP TABLE "attachment";

-- DropTable
DROP TABLE "beneficiary";

-- DropTable
DROP TABLE "crossborderorder";

-- DropTable
DROP TABLE "crossborderpayment";

-- DropTable
DROP TABLE "log";

-- DropTable
DROP TABLE "order";

-- DropTable
DROP TABLE "payment";

-- DropTable
DROP TABLE "recipient";

-- DropTable
DROP TABLE "recipient_bank_account";

-- DropTable
DROP TABLE "transaction";

-- DropTable
DROP TABLE "transfertime";

-- DropEnum
DROP TYPE "EnumBankAccountType";

-- DropEnum
DROP TYPE "EnumBankCodeType";

-- DropEnum
DROP TYPE "EnumBusinessType";

-- DropEnum
DROP TYPE "EnumIdType";

-- DropEnum
DROP TYPE "EnumOrderStatus";

-- DropEnum
DROP TYPE "EnumTransferNetwork";

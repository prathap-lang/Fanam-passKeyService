/*
  Warnings:

  - The values [Education,Family_expense,Rental,Salary,Working_capital] on the enum `EnumPurpose` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `address_line1` on the `beneficiary` table. All the data in the column will be lost.
  - You are about to drop the column `address_line2` on the `beneficiary` table. All the data in the column will be lost.
  - You are about to drop the column `beneficiary_name` on the `beneficiary` table. All the data in the column will be lost.
  - You are about to drop the column `address_line1` on the `recipient` table. All the data in the column will be lost.
  - You are about to drop the column `address_line2` on the `recipient` table. All the data in the column will be lost.
  - You are about to drop the column `address_line1` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `address_line2` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `id_issued_country_id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `id_number` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `id_type` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `sender_bank_account` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[phone_no]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `beneficiary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `beneficiary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `beneficiary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_line_1` to the `recipient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipient_account_type` to the `recipient` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `account_type` on the `recipient_bank_account` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `account_type` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pin` to the `user` table without a default value. This is not possible if the table is not empty.
  - Made the column `first_name` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "EnumOrderStatus" AS ENUM ('Payment_initiated', 'Payment_pending', 'Payment_success', 'Payment_failure');

-- CreateEnum
CREATE TYPE "EnumIdType" AS ENUM ('Aadhaar', 'PAN', 'GST', 'Passport', 'Driving_License');

-- CreateEnum
CREATE TYPE "EnumBankAccountType" AS ENUM ('Current', 'Savings', 'Overdraft');

-- CreateEnum
CREATE TYPE "EnumBankCodeType" AS ENUM ('Sort', 'Swift', 'BSB', 'routing', 'IFSC', 'IBAN');

-- CreateEnum
CREATE TYPE "EnumBusinessType" AS ENUM ('Sole_proprietor', 'Partnership_firm', 'Companies', 'Limited_liability_partnership');

-- CreateEnum
CREATE TYPE "EnumTransfercharge" AS ENUM ('in_one_hour_charge', 'in_five_hour_charge', 'in_one_to_two_days_charge', 'in_three_to_five_days_charge');

-- AlterEnum
BEGIN;
CREATE TYPE "EnumPurpose_new" AS ENUM ('Tuition_fee', 'Travel', 'Hospital', 'Insurance', 'Living_expenses', 'Rent', 'Retail', 'Others', 'Payroll_and_pension', 'Import_and_export', 'Legal_fees');
ALTER TABLE "recipient" ALTER COLUMN "purpose" TYPE "EnumPurpose_new" USING ("purpose"::text::"EnumPurpose_new");
ALTER TABLE "transaction" ALTER COLUMN "purpose" TYPE "EnumPurpose_new" USING ("purpose"::text::"EnumPurpose_new");
ALTER TYPE "EnumPurpose" RENAME TO "EnumPurpose_old";
ALTER TYPE "EnumPurpose_new" RENAME TO "EnumPurpose";
DROP TYPE "EnumPurpose_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "sender_bank_account" DROP CONSTRAINT "sender_bank_account_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_id_issued_country_id_fkey";

-- AlterTable
ALTER TABLE "attachment" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "sender_kyc_detail_id" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "beneficiary" DROP COLUMN "address_line1",
DROP COLUMN "address_line2",
DROP COLUMN "beneficiary_name",
ADD COLUMN     "account_no" TEXT,
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "country" ADD COLUMN     "bankInputs" JSONB[];

-- AlterTable
ALTER TABLE "recipient" DROP COLUMN "address_line1",
DROP COLUMN "address_line2",
ADD COLUMN     "address_line_1" TEXT NOT NULL,
ADD COLUMN     "address_line_2" TEXT,
ADD COLUMN     "business_name" TEXT,
ADD COLUMN     "recipient_account_type" "EnumAccount" NOT NULL,
ALTER COLUMN "purpose" DROP NOT NULL;

-- AlterTable
ALTER TABLE "recipient_bank_account" ADD COLUMN     "bank_code_type" "EnumBankCodeType",
DROP COLUMN "account_type",
ADD COLUMN     "account_type" "EnumBankAccountType" NOT NULL;

-- AlterTable
ALTER TABLE "transaction" ALTER COLUMN "purpose" DROP NOT NULL,
ALTER COLUMN "reason" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "created_by_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "address_line1",
DROP COLUMN "address_line2",
DROP COLUMN "id_issued_country_id",
DROP COLUMN "id_number",
DROP COLUMN "id_type",
ADD COLUMN     "account_no" TEXT,
ADD COLUMN     "account_type" "EnumAccount" NOT NULL,
ADD COLUMN     "address_line_1" TEXT,
ADD COLUMN     "address_line_2" TEXT,
ADD COLUMN     "business_name" TEXT,
ADD COLUMN     "business_type" "EnumBusinessType",
ADD COLUMN     "country_code" TEXT,
ADD COLUMN     "date_of_birth" TIMESTAMP(3),
ADD COLUMN     "noOfWrongPinAttempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "pin" TEXT NOT NULL,
ALTER COLUMN "first_name" SET NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- DropTable
DROP TABLE "sender_bank_account";

-- CreateTable
CREATE TABLE "passwordHistory" (
    "hash_id" TEXT NOT NULL,
    "hashed_password" TEXT NOT NULL,
    "user_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "passwordHistory_pkey" PRIMARY KEY ("hash_id")
);

-- CreateTable
CREATE TABLE "KycDetail" (
    "kyc_id" TEXT NOT NULL,
    "type" "EnumIdType",
    "kyc_number" TEXT,
    "pan_first_name" TEXT,
    "aadhaar_name" TEXT,
    "aadhaar_date_of_birth" TIMESTAMP(3),
    "issued_country_id" INTEGER,
    "request_id" TEXT,
    "share_code" TEXT,
    "consent" BOOLEAN NOT NULL DEFAULT false,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "created_by_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KycDetail_pkey" PRIMARY KEY ("kyc_id")
);

-- CreateTable
CREATE TABLE "order" (
    "order_id" TEXT NOT NULL,
    "order_no" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "razorpay_order_id" TEXT,
    "order_status" "EnumOrderStatus" NOT NULL,
    "payment_status" TEXT,
    "transaction_id" TEXT NOT NULL,
    "payment_id" TEXT,
    "user_id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "payment" (
    "payment_id" TEXT NOT NULL,
    "razorpay_payment_id" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "invoiceId" TEXT,
    "status" "EnumOrderStatus" NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "log" (
    "id" TEXT NOT NULL,
    "status" "EnumOrderStatus" NOT NULL,
    "remark" JSONB,
    "order_id" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crossborderorder" (
    "id" TEXT NOT NULL,
    "transactionDateTime" TEXT NOT NULL,
    "settlementCurrencyCode" TEXT NOT NULL,
    "payoutId" TEXT NOT NULL,
    "clientReferenceId" TEXT NOT NULL,
    "payoutSpeed" TEXT,
    "notificationDateTime" TEXT NOT NULL,
    "initiatingPartyId" TEXT NOT NULL,
    "fxConversionRa" INTEGER NOT NULL,
    "expectedPostingDate" TEXT,
    "destinationCurrencyCode" TEXT NOT NULL,
    "transactionAmount" DOUBLE PRECISION NOT NULL,
    "transactionCurrencyCode" TEXT NOT NULL,
    "endToEndId" TEXT,
    "fxConversionRate" INTEGER,
    "payoutMethod" TEXT,
    "settlementAmount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "destinationAmount" DOUBLE PRECISION NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "crossborderorder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crossborderpayment" (
    "id" TEXT NOT NULL,
    "invoiceId" TEXT,
    "status" TEXT NOT NULL,
    "crossborderorderid" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "crossborderpayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "passkey" (
    "cred_id" TEXT NOT NULL,
    "cred_public_key" TEXT NOT NULL,
    "device_type" TEXT NOT NULL,
    "credential_type" TEXT NOT NULL,
    "user_id" TEXT,
    "webauth_user_id" TEXT NOT NULL,
    "counter" INTEGER NOT NULL,
    "backup_eligible" BOOLEAN NOT NULL DEFAULT true,
    "backup_status" BOOLEAN NOT NULL DEFAULT true,
    "transports" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "passkey_pkey" PRIMARY KEY ("cred_id")
);

-- CreateTable
CREATE TABLE "transfertime" (
    "id" TEXT NOT NULL,
    "type" "EnumTransfercharge" NOT NULL,
    "charges" DOUBLE PRECISION NOT NULL,
    "country_currency" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transfertime_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "order_transaction_id_key" ON "order"("transaction_id");

-- CreateIndex
CREATE UNIQUE INDEX "order_payment_id_key" ON "order"("payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_no_key" ON "user"("phone_no");

-- AddForeignKey
ALTER TABLE "passwordHistory" ADD CONSTRAINT "passwordHistory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attachment" ADD CONSTRAINT "attachment_sender_kyc_detail_id_fkey" FOREIGN KEY ("sender_kyc_detail_id") REFERENCES "KycDetail"("kyc_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KycDetail" ADD CONSTRAINT "KycDetail_issued_country_id_fkey" FOREIGN KEY ("issued_country_id") REFERENCES "country"("country_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KycDetail" ADD CONSTRAINT "KycDetail_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transaction"("transaction_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payment"("payment_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log" ADD CONSTRAINT "log_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log" ADD CONSTRAINT "log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crossborderorder" ADD CONSTRAINT "crossborderorder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crossborderpayment" ADD CONSTRAINT "crossborderpayment_crossborderorderid_fkey" FOREIGN KEY ("crossborderorderid") REFERENCES "crossborderorder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "passkey" ADD CONSTRAINT "passkey_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

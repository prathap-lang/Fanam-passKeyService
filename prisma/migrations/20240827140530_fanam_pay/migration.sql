-- CreateEnum
CREATE TYPE "EnumMime" AS ENUM ('Image', 'Pdf', 'Document');

-- CreateEnum
CREATE TYPE "EnumAccount" AS ENUM ('Individual', 'Business');

-- CreateEnum
CREATE TYPE "EnumPurpose" AS ENUM ('Education', 'Travel', 'Hospital', 'Insurance', 'Family_expense', 'Rental', 'Others', 'Salary', 'Working_capital');

-- CreateEnum
CREATE TYPE "EnumUserStatus" AS ENUM ('Active', 'In_active', 'Blocked');

-- CreateEnum
CREATE TYPE "EnumUserRole" AS ENUM ('User', 'Guest', 'Admin');

-- CreateEnum
CREATE TYPE "EnumTransactionStatus" AS ENUM ('Transaction_initiated', 'Invoice_upload', 'Recipient_picked', 'Beneficiary_picked', 'Payment_initiated', 'Payment_pending', 'Payment_successful', 'Payment_failed');

-- CreateEnum
CREATE TYPE "EnumRelationship" AS ENUM ('Father', 'Mother', 'Sister', 'Brother', 'Cousin', 'Son', 'Daughter', 'Friend', 'Uncle', 'Aunty', 'Grandmother', 'Grandfather', 'Sister_in_law', 'Father_in_law', 'Mother_in_law', 'Brother_in_law', 'Nephew', 'Niece', 'Not_applicable');

-- CreateTable
CREATE TABLE "user" (
    "user_id" TEXT NOT NULL,
    "customer_hash" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "email" TEXT NOT NULL,
    "phone_no" TEXT,
    "address_line1" TEXT,
    "address_line2" TEXT,
    "id_type" TEXT,
    "id_number" TEXT,
    "id_issued_country_id" INTEGER,
    "country_id" INTEGER,
    "state_id" INTEGER,
    "city_id" INTEGER,
    "zip_code" TEXT,
    "role_id" TEXT,
    "status" "EnumUserStatus" DEFAULT 'Active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "role" (
    "role_id" TEXT NOT NULL,
    "role" "EnumUserRole" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "permission" (
    "identifier" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "permission_pkey" PRIMARY KEY ("identifier")
);

-- CreateTable
CREATE TABLE "recipient_bank_account" (
    "account_id" TEXT NOT NULL,
    "account_no" TEXT NOT NULL,
    "account_holder" TEXT NOT NULL,
    "iban_no" TEXT,
    "swift_code" TEXT NOT NULL,
    "routing_code" TEXT,
    "bank_name" TEXT NOT NULL,
    "branch_code" TEXT NOT NULL,
    "branch_address" TEXT,
    "account_type" "EnumAccount" NOT NULL,
    "recipient_id" TEXT,
    "created_by_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recipient_bank_account_pkey" PRIMARY KEY ("account_id")
);

-- CreateTable
CREATE TABLE "sender_bank_account" (
    "account_id" TEXT NOT NULL,
    "account_no" TEXT NOT NULL,
    "account_type" "EnumAccount" NOT NULL,
    "created_by_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sender_bank_account_pkey" PRIMARY KEY ("account_id")
);

-- CreateTable
CREATE TABLE "recipient" (
    "recipient_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_no" TEXT NOT NULL,
    "address_line1" TEXT NOT NULL,
    "address_line2" TEXT NOT NULL,
    "id_type" TEXT NOT NULL,
    "id_number" TEXT NOT NULL,
    "id_issued_country_id" INTEGER NOT NULL,
    "country_id" INTEGER,
    "state_id" INTEGER,
    "city_id" INTEGER,
    "zip_code" TEXT NOT NULL,
    "purpose" "EnumPurpose" NOT NULL,
    "bank_account_id" TEXT,
    "created_by_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recipient_pkey" PRIMARY KEY ("recipient_id")
);

-- CreateTable
CREATE TABLE "beneficiary" (
    "beneficiary_id" TEXT NOT NULL,
    "beneficiary_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "country_id" INTEGER NOT NULL,
    "phone_no" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "address_line1" TEXT NOT NULL,
    "address_line2" TEXT NOT NULL,
    "state_id" INTEGER NOT NULL,
    "city_id" INTEGER NOT NULL,
    "zip_code" TEXT NOT NULL,
    "created_by_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "beneficiary_pkey" PRIMARY KEY ("beneficiary_id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "transaction_id" TEXT NOT NULL,
    "sender_account_type" "EnumAccount",
    "recipient_account_type" "EnumAccount" NOT NULL,
    "source_country_id" INTEGER,
    "destination_country_id" INTEGER,
    "source_amount" DOUBLE PRECISION,
    "destination_amount" DOUBLE PRECISION,
    "markup_fee" DOUBLE PRECISION,
    "purpose" "EnumPurpose" NOT NULL,
    "reason" TEXT NOT NULL,
    "status" "EnumTransactionStatus" NOT NULL,
    "recipient_id" TEXT,
    "recipient_relationship" "EnumRelationship",
    "beneficiary_id" TEXT,
    "created_by_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("transaction_id")
);

-- CreateTable
CREATE TABLE "attachment" (
    "attachment_id" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "original_name" TEXT NOT NULL,
    "mime" TEXT NOT NULL,
    "transaction_id" TEXT,
    "user_id" TEXT,
    "recipient_id" TEXT,

    CONSTRAINT "attachment_pkey" PRIMARY KEY ("attachment_id")
);

-- CreateTable
CREATE TABLE "region" (
    "region_id" INTEGER NOT NULL,
    "region_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "region_pkey" PRIMARY KEY ("region_id")
);

-- CreateTable
CREATE TABLE "subregion" (
    "subregion_id" INTEGER NOT NULL,
    "subregion_name" TEXT NOT NULL,
    "region_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subregion_pkey" PRIMARY KEY ("subregion_id")
);

-- CreateTable
CREATE TABLE "country" (
    "country_id" INTEGER NOT NULL,
    "country_name" TEXT NOT NULL,
    "iso3" TEXT NOT NULL,
    "iso2" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "emojiU" TEXT NOT NULL,
    "numeric_code" TEXT NOT NULL,
    "phone_code" TEXT NOT NULL,
    "capital" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "currency_name" TEXT NOT NULL,
    "currency_symbol" TEXT NOT NULL,
    "tld" TEXT NOT NULL,
    "native" TEXT,
    "nationality" TEXT NOT NULL,
    "latitude" TEXT,
    "longitude" TEXT,
    "subregion_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "country_pkey" PRIMARY KEY ("country_id")
);

-- CreateTable
CREATE TABLE "state" (
    "state_id" INTEGER NOT NULL,
    "state_name" TEXT NOT NULL,
    "state_code" TEXT NOT NULL,
    "latitude" TEXT,
    "longitude" TEXT,
    "type" TEXT,
    "country_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "state_pkey" PRIMARY KEY ("state_id")
);

-- CreateTable
CREATE TABLE "city" (
    "city_id" INTEGER NOT NULL,
    "city_name" TEXT NOT NULL,
    "latitude" TEXT,
    "longitude" TEXT,
    "state_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "city_pkey" PRIMARY KEY ("city_id")
);

-- CreateTable
CREATE TABLE "_PermissionsToRole" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "role_role_key" ON "role"("role");

-- CreateIndex
CREATE UNIQUE INDEX "permission_identifier_key" ON "permission"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "recipient_bank_account_account_no_key" ON "recipient_bank_account"("account_no");

-- CreateIndex
CREATE UNIQUE INDEX "recipient_bank_account_recipient_id_key" ON "recipient_bank_account"("recipient_id");

-- CreateIndex
CREATE UNIQUE INDEX "sender_bank_account_account_no_key" ON "sender_bank_account"("account_no");

-- CreateIndex
CREATE UNIQUE INDEX "country_iso2_key" ON "country"("iso2");

-- CreateIndex
CREATE UNIQUE INDEX "_PermissionsToRole_AB_unique" ON "_PermissionsToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_PermissionsToRole_B_index" ON "_PermissionsToRole"("B");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_id_issued_country_id_fkey" FOREIGN KEY ("id_issued_country_id") REFERENCES "country"("country_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("country_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "state"("state_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "city"("city_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("role_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipient_bank_account" ADD CONSTRAINT "recipient_bank_account_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "recipient"("recipient_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipient_bank_account" ADD CONSTRAINT "recipient_bank_account_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sender_bank_account" ADD CONSTRAINT "sender_bank_account_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipient" ADD CONSTRAINT "recipient_id_issued_country_id_fkey" FOREIGN KEY ("id_issued_country_id") REFERENCES "country"("country_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipient" ADD CONSTRAINT "recipient_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("country_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipient" ADD CONSTRAINT "recipient_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "state"("state_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipient" ADD CONSTRAINT "recipient_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "city"("city_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipient" ADD CONSTRAINT "recipient_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beneficiary" ADD CONSTRAINT "beneficiary_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("country_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beneficiary" ADD CONSTRAINT "beneficiary_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "state"("state_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beneficiary" ADD CONSTRAINT "beneficiary_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "city"("city_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beneficiary" ADD CONSTRAINT "beneficiary_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_source_country_id_fkey" FOREIGN KEY ("source_country_id") REFERENCES "country"("country_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_destination_country_id_fkey" FOREIGN KEY ("destination_country_id") REFERENCES "country"("country_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "recipient"("recipient_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_beneficiary_id_fkey" FOREIGN KEY ("beneficiary_id") REFERENCES "beneficiary"("beneficiary_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attachment" ADD CONSTRAINT "attachment_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transaction"("transaction_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attachment" ADD CONSTRAINT "attachment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attachment" ADD CONSTRAINT "attachment_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "recipient"("recipient_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subregion" ADD CONSTRAINT "subregion_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "region"("region_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "country" ADD CONSTRAINT "country_subregion_id_fkey" FOREIGN KEY ("subregion_id") REFERENCES "subregion"("subregion_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "state" ADD CONSTRAINT "state_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("country_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "city" ADD CONSTRAINT "city_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "state"("state_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionsToRole" ADD CONSTRAINT "_PermissionsToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "permission"("identifier") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionsToRole" ADD CONSTRAINT "_PermissionsToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "role"("role_id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - The `email` column on the `Contact` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `email` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "email",
ADD COLUMN     "email" TEXT[];

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
ADD COLUMN     "email" TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "Contact_email_key" ON "Contact"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

/*
  Warnings:

  - You are about to drop the column `photo_url` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `photo_url` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `photo_url` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "photo_url",
ADD COLUMN     "photoUrl" TEXT NOT NULL DEFAULT 'https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png';

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "photo_url",
ADD COLUMN     "photoUrl" TEXT NOT NULL DEFAULT 'https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "photo_url",
ADD COLUMN     "photoUrl" TEXT NOT NULL DEFAULT 'https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png',
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "email" SET DATA TYPE TEXT;

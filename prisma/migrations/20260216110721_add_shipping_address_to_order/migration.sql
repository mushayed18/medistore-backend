/*
  Warnings:

  - Added the required column `shippingAddress` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingCity` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingName` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingPhone` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingZip` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "shippingAddress" TEXT NOT NULL,
ADD COLUMN     "shippingCity" TEXT NOT NULL,
ADD COLUMN     "shippingName" TEXT NOT NULL,
ADD COLUMN     "shippingPhone" TEXT NOT NULL,
ADD COLUMN     "shippingZip" TEXT NOT NULL;

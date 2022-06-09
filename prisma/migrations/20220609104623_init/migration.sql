/*
  Warnings:

  - Made the column `employeeId` on table `Booking` required. This step will fail if there are existing NULL values in that column.
  - Made the column `companyId` on table `Room` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_companyId_fkey";

-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "employeeId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "companyId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

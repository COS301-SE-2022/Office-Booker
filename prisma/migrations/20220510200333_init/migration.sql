/*
  Warnings:

  - The primary key for the `Desk` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `Desk` table. All the data in the column will be lost.
  - The primary key for the `Facility` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `Facility` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Facility" DROP CONSTRAINT "Facility_deskId_fkey";

-- AlterTable
ALTER TABLE "Desk" DROP CONSTRAINT "Desk_pkey",
DROP COLUMN "_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Desk_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Facility" DROP CONSTRAINT "Facility_pkey",
DROP COLUMN "_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Facility_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "deskId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Facility" ADD CONSTRAINT "Facility_deskId_fkey" FOREIGN KEY ("deskId") REFERENCES "Desk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_deskId_fkey" FOREIGN KEY ("deskId") REFERENCES "Desk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `Height` on the `Wall` table. All the data in the column will be lost.
  - You are about to drop the column `LocationCol` on the `Wall` table. All the data in the column will be lost.
  - You are about to drop the column `Width` on the `Wall` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Wall" DROP COLUMN "Height",
DROP COLUMN "LocationCol",
DROP COLUMN "Width";

/*
  Warnings:

  - Added the required column `currentRating` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ratingsReceived` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "currentRating" INTEGER NOT NULL,
ADD COLUMN     "ratingsReceived" INTEGER NOT NULL;

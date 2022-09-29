-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_deskId_fkey";

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_deskId_fkey" FOREIGN KEY ("deskId") REFERENCES "Desk"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "BookingVotedOn" (
    "id" SERIAL NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "employeeId" INTEGER NOT NULL,

    CONSTRAINT "BookingVotedOn_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BookingVotedOn" ADD CONSTRAINT "BookingVotedOn_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingVotedOn" ADD CONSTRAINT "BookingVotedOn_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

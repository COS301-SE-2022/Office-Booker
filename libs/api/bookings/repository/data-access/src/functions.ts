import prisma from './client'
import { Prisma } from '@prisma/client';

interface BookingCreateInput {
    Desk: Prisma.DeskCreateNestedOneWithoutBookingsInput
    startsAt: Date | string
    endsAt: Date | string
}

export async function createBooking(booking: BookingCreateInput) {
    return await prisma.booking.create({
        data: booking,
      });
}
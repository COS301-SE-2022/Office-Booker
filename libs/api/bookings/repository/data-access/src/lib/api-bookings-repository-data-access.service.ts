import { Injectable, Param } from '@nestjs/common';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';

@Injectable()
export class ApiBookingsRepositoryDataAccessService {
    constructor(private prisma: PrismaService) {}


    // get all bookings for a specific desk
    async getBookingsForDesk(@Param() deskId: number) {
        return this.prisma.booking.findMany({
            where: {
                deskId,
            },
        });
    }

    // get a specific booking by its ids
    // for instance if a user wants to see a booking he created
    async getBookingById(@Param() bookingId: number) {
        return this.prisma.booking.findUnique({
            where: {
                id: bookingId,
            },
        });
    }

    // TODO: should be able to filter bookings by the current time
    // we could check if there is a booking for right now
    async getCurrentBookingsForDesk(@Param() deskId: number) {
        return this.prisma.booking.findMany({
            where: {
                deskId,
                //endTime: null,
            },
        });
    }

    // TODO: create a booking
    // should we have entities?

    // TODO: modify bookings?

}

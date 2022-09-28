import { Injectable, Param } from '@nestjs/common';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';
import { Prisma } from '@prisma/client';

@Injectable()
export class ApiBookingsRepositoryDataAccessService {
    constructor(private prisma: PrismaService) {}

    async getAllBookings() {
        return this.prisma.booking.findMany();
    }

    // get all bookings for a specific desk
    async getBookingsForDesk(@Param() deskId: number) {
        return this.prisma.booking.findMany({
            where: {
                deskId,
            },
        });
    }

    async getCurrentBookingsForDesk(@Param() deskId: number) {
        // do we need this method?
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

    // should we have entities?
    async createBooking(@Param() booking: Prisma.BookingCreateInput) {
        return this.prisma.booking.create({
            data: booking,
        });
    }


    // delete a booking
    async deleteBooking(@Param() bookingId: number) {
        return this.prisma.booking.delete({
            where: {
                id: bookingId,
            },
        });
    }

    async getBookingsByUserId(@Param() userId: number) {
        return this.prisma.booking.findMany({
            where: {
                employeeId: userId,
            },
        });
    }

    // invites

    // create an invite for a specific booking
    async createInvite(@Param() bookingId: number, @Param() userEmail: string) {
        return this.prisma.invite.create({
            data: {
                Booking: {  
                    connect: {
                        id: bookingId,
                    },
                },
                invitedEmployee: {
                    connect: {
                        email: userEmail,
                    },
                },
                accepted: false,
            },
        });
    }

    // get all invites for a specific booking
    async getInvitesForBooking(@Param() bookingId: number) {
        return this.prisma.invite.findMany({
            where: {
                bookingId,
            },
        });
    }

    // get all invites for a specific user
    async getInvitesForUser(@Param() userId: number) {
        return this.prisma.invite.findMany({
            where: {
                invitedEmployee: {
                    id: userId,
                },
            },
            include: {
                Booking: true,
            }
        });
    }

    // get a specific invite by its id
    async getInviteById(@Param() inviteId: number) {
        return this.prisma.invite.findUnique({
            where: {
                id: inviteId,
            },
        });
    }

    // accept an invite
    async acceptInvite(@Param() inviteId: number) {
        return this.prisma.invite.update({
            where: {
                id: inviteId,
            },
            data: {
                accepted: true,
            },
        });
    }

    // reject an invite
    async deleteInvite(@Param() inviteId: number) {
        return this.prisma.invite.delete({
            where: {
                id: inviteId,
            },
        });
    }

    // create duplicate invited booking
    async createInvitedBooking(@Param() inviteId: number) {
        const invite = await this.getInviteById(inviteId);
        const booking = await this.getBookingById(invite.bookingId);
        delete booking.id;
        return this.prisma.booking.create({
            data: {
                ...booking,
                employeeId: invite.employeeId,
                isInvited: true,
            },
        });
    }

    // get the users who have already voted on a specific booking
    async getUsersVotedOnBooking(@Param() bookingId: number) {
        return this.prisma.booking.findUnique({
            where: {
                id: bookingId,
            },
            select: {
                BookingVotedOn: {
                    select: {
                        Employee: true,
                    },
                },
            },
        });
    }

}

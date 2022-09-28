import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBookingsRepositoryDataAccessService } from '@office-booker/api/bookings/repository/data-access';
import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { AuthGuard } from '@nestjs/passport';
import { ApiPermissionsService } from '@office-booker/api/permissions';

class CreateBookingDto {
    @IsDate()
    @Type(() => Date)
    startsAt: Date;

    @IsDate()
    @Type(() => Date)
    endsAt: Date;

    @Type(() => Number)
    deskId: number;

    @Type(() => Number)
    userId: number;
}

class EmailDto {
    email: string;
}

class VotingDto {
    userId: number;
    currentRating:   number;
    ratingsReceived: number;
}

@UseGuards(AuthGuard('jwt'))
@Controller('bookings')
export class ApiBookingsApiController {
    constructor(private bookingService: ApiBookingsRepositoryDataAccessService,
        private permissionService: ApiPermissionsService) { }

    @Get('/desk/:deskId')
    async getBookingsForDesk(@Param('deskId') deskId: string) {
        return this.bookingService.getBookingsForDesk(Number(deskId));
    }

    @Get('/')
    async getAllBookings() {
        return this.bookingService.getAllBookings();
    }

    @Get('/desk/current/:deskId')
    async getCurrentBookingsForDesk(@Param('deskId') deskId: string) {
        return this.bookingService.getCurrentBookingsForDesk(Number(deskId));
    }

    @Get('/user/:userId')
    async getBookingsForUser(@Param('userId') userId: string) {
        return this.bookingService.getBookingsByUserId(Number(userId));
    }

    @Get('/:bookingId')
    async getBookingById(@Param('bookingId') bookingId: string) {
        return this.bookingService.getBookingById(Number(bookingId));
    }

    @Delete('/:bookingId')
    async deleteBooking(@Param('bookingId') bookingId: string) {
        return this.bookingService.deleteBooking(Number(bookingId));
    }

    @Post('/')
    async createBooking(@Body() postData: CreateBookingDto) {
        const { startsAt, endsAt, deskId, userId } = postData;

        if (!this.permissionService.userAndDesk(Number(userId), Number(deskId))) {
            throw new Error('You are not allowed to create a booking for this desk.');
        }

        return this.bookingService.createBooking({
            startsAt: startsAt,
            endsAt: endsAt,
            Desk: {
                connect: { id: Number(deskId) },
            },
            Employee: {
                connect: { id: Number(userId) },
            }
        });
    }

    // invites

    @Post('/invites/:bookingId')
    async inviteUser(@Param('bookingId') bookingId: string, @Body() emailDto: EmailDto) {
        return this.bookingService.createInvite(Number(bookingId), emailDto.email);
    }

    @Get('/invites/:bookingId')
    async getInvites(@Param('bookingId') bookingId: string) {
        return this.bookingService.getInvitesForBooking(Number(bookingId));
    }

    @Get('/invites/user/:userId')
    async getInvitesForUser(@Param('userId') userId: string) {
        return this.bookingService.getInvitesForUser(Number(userId));
    }

    @Put('/invites/accept/:inviteId')
    async acceptInvite(@Param('inviteId') inviteId: string) {
        await this.bookingService.acceptInvite(Number(inviteId));
        await this.bookingService.createInvitedBooking(Number(inviteId));
        return this.bookingService.deleteInvite(Number(inviteId));
    }

    @Put('/invites/decline/:inviteId')
    async declineInvite(@Param('inviteId') inviteId: string) {
        return this.bookingService.deleteInvite(Number(inviteId));
    }

    @Put('/invites/delete/:inviteId')
    async deleteInvite(@Param('inviteId') inviteId: string) {
        return this.bookingService.deleteInvite(Number(inviteId));
    }

    @Get('/canVote/:userId')
    async getBookingsUserCanVoteOn(@Param('userId') userId: string) {
        return this.bookingService.getBookingsUserCanVoteOn(Number(userId));
    }

    @Get('/votes/booking/:bookingId')
    async getUsersVotedOnBooking(@Param('bookingId') bookingId: string) {
        return this.bookingService.getUsersVotedOnBooking(Number(bookingId));
    }

    @Post('/votes/booking/:bookingId')
    async createVoteOnBooking(@Param('bookingId') bookingId: string, @Body() postData: VotingDto) {
        const { userId, currentRating, ratingsReceived } = postData;
        if (await this.bookingService.isUserAllowedToVote(userId, Number(bookingId))) {
            return this.bookingService.createVoteOnBooking(Number(bookingId), userId, currentRating, ratingsReceived);
        } else {
            throw new BadRequestException("This user has already voted on this booking.");
        }
    }
}

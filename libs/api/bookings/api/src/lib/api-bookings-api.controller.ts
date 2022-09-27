import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
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

class emailDto {
    email: string;
}

@UseGuards(AuthGuard('jwt'))
@Controller('bookings')
export class ApiBookingsApiController {
    constructor(private bookingService: ApiBookingsRepositoryDataAccessService,
        private permissionService: ApiPermissionsService) { }

    @Get('/desk/:deskId')
    async getBookingsForDesk(@Param('deskId') deskId: string) {
        return await this.bookingService.getBookingsForDesk(Number(deskId));
    }

    @Get('/')
    async getAllBookings() {
        return await this.bookingService.getAllBookings();
    }


    @Get('/user/:userId')
    async getBookingsForUser(@Param('userId') userId: string) {
        return await this.bookingService.getBookingsByUserId(Number(userId));
    }

    @Get('/:bookingId')
    async getBookingById(@Param('bookingId') bookingId: string) {
        return await this.bookingService.getBookingById(Number(bookingId));
    }

    @Get('/desk/current/:deskId')
    async getCurrentBookingsForDesk(@Param('deskId') deskId: string) {
        return await this.bookingService.getCurrentBookingsForDesk(Number(deskId));
    }

    @Delete('/:bookingId')
    async deleteBooking(@Param('bookingId') bookingId: string) {
        return await this.bookingService.deleteBooking(Number(bookingId));
    }

    @Post('/')
    async createBooking(@Body() postData: CreateBookingDto) {
        const { startsAt, endsAt, deskId, userId } = postData;

        if (!this.permissionService.userAndDesk(Number(userId), Number(deskId))) {
            throw new Error('You are not allowed to create a booking for this desk.');
        }

        return await this.bookingService.createBooking({
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
    async inviteUser(@Param('bookingId') bookingId: string, @Body() emailDto: emailDto) {
        return await this.bookingService.createInvite(Number(bookingId), emailDto.email);
    }

    @Get('/invites/:bookingId')
    async getInvites(@Param('bookingId') bookingId: string) {
        return await this.bookingService.getInvitesForBooking(Number(bookingId));
    }

    @Get('/invites/user/:userId')
    async getInvitesForUser(@Param('userId') userId: string) {
        return await this.bookingService.getInvitesForUser(Number(userId));
    }

    @Put('/invites/accept/:inviteId')
    async acceptInvite(@Param('inviteId') inviteId: string) {
        await this.bookingService.acceptInvite(Number(inviteId));
        await this.bookingService.createInvitedBooking(Number(inviteId));
        return await this.bookingService.deleteInvite(Number(inviteId));
    }

    @Put('/invites/decline/:inviteId')
    async declineInvite(@Param('inviteId') inviteId: string) {
        return await this.bookingService.deleteInvite(Number(inviteId));
    }

    @Put('/invites/delete/:inviteId')
    async deleteInvite(@Param('inviteId') inviteId: string) {
        return await this.bookingService.deleteInvite(Number(inviteId));
    }

}

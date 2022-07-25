import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
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

    @Post('/:deskId/:userId')
    async createBooking(@Param('deskId') deskId: string, @Param('userId') userId: string, @Body() postData: CreateBookingDto) {
        if (!this.permissionService.userAndDesk(Number(userId), Number(deskId))) {
            console.log("User and desk don't match");
            throw new Error('You are not allowed to create a booking for this desk.');
        }

        const { startsAt, endsAt } = postData;
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

    @Post('/:bookingId/invite/')
    async inviteUser(@Param('bookingId') bookingId: string, @Body() emailDto: emailDto) {
        return await this.bookingService.createInvite(Number(bookingId), emailDto.email);
    }

    @Get('/:bookingId/invites/')
    async getInvites(@Param('bookingId') bookingId: string) {
        return await this.bookingService.getInvitesForBooking(Number(bookingId));
    }


}

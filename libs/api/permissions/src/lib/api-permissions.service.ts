import { Injectable, Param } from '@nestjs/common';
import { ApiBookingsRepositoryDataAccessService } from '@office-booker/api/bookings/repository/data-access';
import { ApiCompaniesRepositoryDataAccessService } from '@office-booker/api/companies/repository/data-access';
import { ApiDesksRepositoryDataAccessService } from '@office-booker/api/desks/repository/data-access';
import { ApiRoomsRepositoryDataAccessService } from '@office-booker/api/rooms/repository/data-access';
import { ApiUsersRepositoryDataAccessService } from '@office-booker/api/users/repository/data-access';

@Injectable()
export class ApiPermissionsService {
    constructor(private userService: ApiUsersRepositoryDataAccessService,
        private deskService: ApiDesksRepositoryDataAccessService,
        private roomService: ApiRoomsRepositoryDataAccessService,
        private companyService: ApiCompaniesRepositoryDataAccessService,
        private bookingService: ApiBookingsRepositoryDataAccessService) {}


    async userAndDesk(@Param() userId: number, @Param() deskId: number) : Promise<boolean> {
        const user = await this.userService.getUserById(userId);
        const desk = await this.deskService.getDeskById(deskId);
        const room = await this.roomService.getRoomById(desk.roomId);
        const company = await this.companyService.getCompanyById(room.companyId);
        // console.log("user and desk companies match!")
        return user.companyId === company.id;
    }

    async userAndBooking(userId: number, bookingId: number) : Promise<boolean> {
        const booking = await this.bookingService.getBookingById(bookingId);
        return this.userAndDesk(userId, booking.deskId);
    }
}

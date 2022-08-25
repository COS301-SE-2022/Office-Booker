import { Injectable} from '@nestjs/common';
import { ApiBookingsRepositoryDataAccessService } from '@office-booker/api/bookings/repository/data-access';
import { ApiCompaniesRepositoryDataAccessService } from '@office-booker/api/companies/repository/data-access';
import { ApiDesksRepositoryDataAccessService } from '@office-booker/api/desks/repository/data-access';
import { ApiRoomsRepositoryDataAccessService } from '@office-booker/api/rooms/repository/data-access';
import { ApiUsersRepositoryDataAccessService } from '@office-booker/api/users/repository/data-access';
import { Employee } from '@prisma/client';

@Injectable()
export class ApiPermissionsService {
    constructor(private userService: ApiUsersRepositoryDataAccessService,
        private deskService: ApiDesksRepositoryDataAccessService,
        private roomService: ApiRoomsRepositoryDataAccessService,
        private companyService: ApiCompaniesRepositoryDataAccessService,
        private bookingService: ApiBookingsRepositoryDataAccessService) {}

    async userAndCompany(user: Employee, companyId: number) : Promise<boolean> {
        return user.companyId == companyId;
    }

    async userAndDesk(user: Employee, deskId: number) : Promise<boolean> {
        const desk = await this.deskService.getDeskById(deskId);
        const room = await this.roomService.getRoomById(desk.roomId);
        return this.userAndCompany(user, room.companyId);
    }

    async userAndBooking(user: Employee, bookingId: number) : Promise<boolean> {
        const booking = await this.bookingService.getBookingById(bookingId);
        return this.userAndDesk(user, booking.deskId) || user.admin;
    }
}

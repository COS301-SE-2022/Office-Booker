import { Injectable, Param } from '@nestjs/common';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';

@Injectable()
export class ApiUsersRepositoryDataAccessService {
    constructor(private prisma: PrismaService) {}

    async getUsers() {
        return this.prisma.employee.findMany();
    }

    async getUserById(@Param() userId: number) {
        return this.prisma.employee.findUnique({
            where: {
                id: userId,
            },
        });
    }

    async getUserByCompanyId(@Param() companyId: number) {
        return this.prisma.employee.findMany({
            where: {
                companyId,
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
}

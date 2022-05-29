import { Injectable, Param } from '@nestjs/common';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';
import { Prisma } from '@prisma/client';

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

    async createUser(user: Prisma.EmployeeCreateInput) {
        return this.prisma.employee.create({
            data: user,
        });
    }

    async deleteUser(@Param() userId: number) {
        return this.prisma.employee.delete({
            where: {
                id: userId,
            },
        });
    }

}

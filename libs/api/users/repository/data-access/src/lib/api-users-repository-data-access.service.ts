import { Injectable, Param } from '@nestjs/common';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';
import { Prisma } from '@prisma/client';

@Injectable()
export class ApiUsersRepositoryDataAccessService {
    constructor(private prisma: PrismaService) { }

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

    async getUserByEmail(@Param() email: string) {
        return this.prisma.employee.findUnique({
            where: {
                email,
            },
        });
    }

    async getUsersByCompanyId(@Param() companyId: number) {
        return this.prisma.employee.findMany({
            where: {
                companyId: companyId,
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

    async getUserRating(@Param() userId: number) {
        return this.prisma.employee.findUnique({
            where: {
                id: userId,
            },
            select: {
                currentRating: true,
                ratingsReceived: true,
            }
        });
    }

    async updateUserRating(@Param() userID: number, current: number, ratings: number) {
        return this.prisma.employee.update({
            where: {
                id: userID,
            },
            data: {
                currentRating: current,
                ratingsReceived: ratings,
            },
        });
    }

    async changeUserName(@Param() userID: number, name: string) {
        return this.prisma.employee.update({
            where: {
                id: userID,
            },
            data: {
                name: name,
            },
        });
    }
}

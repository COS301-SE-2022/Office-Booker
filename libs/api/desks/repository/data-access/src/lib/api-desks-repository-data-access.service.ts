import { Injectable } from '@nestjs/common';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';
import { Prisma } from '@prisma/client';

@Injectable()
export class ApiDesksRepositoryDataAccessService {
    constructor(private prisma: PrismaService) {}

    // get all desks
    async getDesks() {
        return this.prisma.desk.findMany();
    }

    // get all desks in a room
    async getDesksInRoom(roomId: number) {
        return this.prisma.desk.findMany({
            where: {
                roomId: roomId,
            }, 
        });
    }

    // get a specific desk by its id
    async getDeskById(deskId: number) {
        return this.prisma.desk.findUnique({
            where: {
                id: deskId,
            },
        });
    }

    //create desk in room by roomID
    async createDeskByRoomId(desk: Prisma.DeskCreateInput) {
        return this.prisma.desk.create({
            data: desk,
        });
    }

    // delete a desk
    async deleteDesk(deskId: number) {
        return this.prisma.desk.delete({
            where: {
                id: deskId,
            },
        });
    }
}

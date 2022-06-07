import { Injectable } from '@nestjs/common';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';


@Injectable()
export class ApiRoomsRepositoryDataAccessService {
    constructor(private prisma: PrismaService) { }

    // get all rooms
    async getRooms() {
        return this.prisma.room.findMany();
    }

    async getRoomById(roomId: number) {
        return this.prisma.room.findUnique({
            where: {
                id: roomId,
            },
        });
    }

    async getRoomsByCompanyId(companyId: number) {
        return this.prisma.room.findMany({
            where: {
                companyId: companyId,
            },
        });
    }
}

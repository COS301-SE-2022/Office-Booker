import { Injectable, Param } from '@nestjs/common';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';


@Injectable()
export class ApiRoomsRepositoryDataAccessService {
    constructor(private prisma: PrismaService) { }

    // get all rooms
    async getRooms() {
        return this.prisma.room.findMany();
    }

    async getRoomById(@Param() roomId: number) {
        return this.prisma.room.findUnique({
            where: {
                id: roomId,
            },
        });
    }
}

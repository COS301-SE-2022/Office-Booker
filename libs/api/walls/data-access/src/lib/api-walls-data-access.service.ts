import { Injectable } from '@nestjs/common';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';

@Injectable()
export class ApiWallsDataAccessService {
    constructor(private prisma: PrismaService) {}

    async getWallsInRoom(roomId: number) {
        return this.prisma.wall.findMany({
            where: {
                roomId: roomId,
            }, 
        });
    }
}

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

    async getWallbyId(id: number) {
        return this.prisma.wall.findUnique({
            where: {
                id: id,
            }, 
        });
    }

    async createWall(roomId: number, Pos1X: number, Pos1Y: number, Pos2X: number, Pos2Y: number) {
        return this.prisma.wall.create({
            data: {
                roomId: roomId,
                Pos1X: Pos1X,
                Pos1Y: Pos1Y,
                Pos2X: Pos2X,
                Pos2Y: Pos2Y, 
            }
        });
    }

    async deleteWall(wallId: number) {
        return this.prisma.wall.delete({
            where: {
                id: wallId,
            }
        })
    }
}

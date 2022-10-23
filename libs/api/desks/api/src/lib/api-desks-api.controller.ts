import { Controller, Get, Param, UseGuards, Post, Body, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiDesksRepositoryDataAccessService } from '@office-booker/api/desks/repository/data-access';

class CreateDeskDto {
    roomId: number;
    LocationRow: number;
    LocationCol: number;
    Height: number;
    Width: number;
    isMeetingRoom: boolean;
    capacity: number;
}

class CreateDeskWithAttributesDto {
    roomId: number;
    LocationRow: number;
    LocationCol: number;
    Height: number;
    Width: number;
    isMeetingRoom: boolean;
    capacity: number;
    plugs: number;
    monitors: number;
    projectors: number;
}

@UseGuards(AuthGuard('jwt'))
@Controller('desks')
export class ApiDesksApiController {
    constructor(private deskService: ApiDesksRepositoryDataAccessService) { }

    @Get()
    async getAll() {
        return this.deskService.getDesks();
    }

    @Get('/room/:roomId')
    async getDesksInRoom(@Param('roomId') roomId: string) {
        return this.deskService.getDesksInRoom(Number(roomId));
    }

    @Post('/')
    async createDeskInRoom(@Body() postData: CreateDeskDto) {
        const { roomId, LocationRow, LocationCol, Height, Width, isMeetingRoom, capacity } = postData;
        return this.deskService.createDeskByRoomId({
            Room: {
                connect: {
                    id: roomId,
                },
            },
            LocationRow: LocationRow,
            LocationCol: LocationCol,
            Height: Height,
            Width: Width,
            isMeetingRoom: isMeetingRoom,
            capacity: capacity,
        });
    }

    @Post('/withAttributes')
    async createDeskWithAttributes(@Body() postData: CreateDeskWithAttributesDto) {
        const { roomId, LocationRow, LocationCol, Height, Width, isMeetingRoom, capacity, plugs, monitors, projectors } = postData;
        return this.deskService.createDeskWithAttributes({
            Room: {
                connect: {
                    id: roomId,
                },
            },
            LocationRow: LocationRow,
            LocationCol: LocationCol,
            Height: Height,
            Width: Width,
            isMeetingRoom: isMeetingRoom,
            capacity: capacity,
        }, plugs, monitors, projectors);
    }

    @Delete('/:deskId')
    async deleteDesk(@Param('deskId') deskId: string) {
        return await this.deskService.deleteDeskById(Number(deskId));
    }
}

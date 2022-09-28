import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiRoomsRepositoryDataAccessService } from '@office-booker/api/rooms/repository/data-access';

class RoomDto {
    name : string;
}
@UseGuards(AuthGuard('jwt'))
@Controller('rooms')
export class ApiRoomsApiController {
    constructor(private roomService: ApiRoomsRepositoryDataAccessService) {}

    @Get()
    async getAll() {
        return await this.roomService.getRooms();
    }

    @Get('/:id')
    async getRoomById(@Param('id') id: string) {
        return await this.roomService.getRoomById(Number(id));
    }

    @Get('/company/:companyId')
    async getRoomsByCompanyId(@Param('companyId') companyId: string) {
        return await this.roomService.getRoomsByCompanyId(Number(companyId));
    }

    @Post('/:companyId')
    async createNewRoom(@Param('companyId') companyId: string, @Body() RoomDto: RoomDto) {
        const {name} = RoomDto;
        return await this.roomService.createNewRoom(Number(companyId), name);
    }
}

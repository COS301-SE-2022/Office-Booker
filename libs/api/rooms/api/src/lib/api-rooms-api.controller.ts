import { Controller, Get, Param } from '@nestjs/common';
import { ApiRoomsRepositoryDataAccessService } from '@office-booker/api/rooms/repository/data-access';

@Controller('rooms')
export class ApiRoomsApiController {
    constructor(private roomService: ApiRoomsRepositoryDataAccessService) {}

    @Get()
    async getAll() {
        return await this.roomService.getRooms();
    }

    @Get('/:id')
    async getRoomById(@Param('id') id: number) {
        return await this.roomService.getRoomById(id);
    }
}

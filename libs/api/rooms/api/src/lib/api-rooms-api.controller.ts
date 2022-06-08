import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiRoomsRepositoryDataAccessService } from '@office-booker/api/rooms/repository/data-access';

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
}

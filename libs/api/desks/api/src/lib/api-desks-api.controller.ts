import { Controller, Get, Param } from '@nestjs/common';
import { ApiDesksRepositoryDataAccessService } from '@office-booker/api/desks/repository/data-access';

@Controller('desks')
export class ApiDesksApiController {
    constructor(private deskService: ApiDesksRepositoryDataAccessService) {}

    @Get()
    async getAll() {
        return await this.deskService.getDesks();
    }

    @Get('/:roomId')
    async getDesksInRoom(@Param('roomId') roomId: number) {
        return await this.deskService.getDesksInRoom(roomId);
    }
}

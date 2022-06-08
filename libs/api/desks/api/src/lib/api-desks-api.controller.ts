import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiDesksRepositoryDataAccessService } from '@office-booker/api/desks/repository/data-access';

@UseGuards(AuthGuard('jwt'))
@Controller('desks')
export class ApiDesksApiController {
    constructor(private deskService: ApiDesksRepositoryDataAccessService) {}

    @Get()
    async getAll() {
        return await this.deskService.getDesks();
    }

    @Get('/room/:roomId')
    async getDesksInRoom(@Param('roomId') roomId: string) {
        return await this.deskService.getDesksInRoom(Number(roomId));
    }
}

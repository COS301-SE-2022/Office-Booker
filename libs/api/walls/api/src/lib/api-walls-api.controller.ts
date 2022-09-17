import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiWallsDataAccessService } from '@office-booker/api/walls/data-access';

@UseGuards(AuthGuard('jwt'))
@Controller('walls')
export class ApiWallsApiController {
    constructor(private wallService: ApiWallsDataAccessService) {}

    @Get("/room/:roomId")
    async getWallsInRoom(@Param('roomId') roomId: string) {
        return await this.wallService.getWallsInRoom(Number(roomId));
    }
}

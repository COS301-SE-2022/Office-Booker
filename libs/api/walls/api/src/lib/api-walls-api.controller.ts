import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiWallsDataAccessService } from '@office-booker/api/walls/data-access';

class createWallDto {
    roomId: number;
    Pos1X: number;
    Pos1Y: number;
    Pos2X: number;
    Pos2Y: number;
}

@UseGuards(AuthGuard('jwt'))
@Controller('walls')
export class ApiWallsApiController {
    constructor(private wallService: ApiWallsDataAccessService) {}

    @Get("/room/:roomId")
    async getWallsInRoom(@Param('roomId') roomId: string) {
        return await this.wallService.getWallsInRoom(Number(roomId));
    }

    @Get("/wall/:wallId")
    async getWallsById(@Param('wallId') wallId: string) {
        return await this.wallService.getWallbyId(Number(wallId));
    }

    @Post("/")
    async createWall() {

    }
}

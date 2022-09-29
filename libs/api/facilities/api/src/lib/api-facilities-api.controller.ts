import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiFacilitiesRepositoryDataAccessService } from '@office-booker/api/facilities/repository/data-access';


class UpdateFacilitiesDto {
    plugs: number;
    monitors: number;
    projectors: number;
}

class CreateFacilitiesDto {
    plugs: number;
    monitors: number;
    projectors: number;
    deskId : string;
}

@UseGuards(AuthGuard('jwt'))
@Controller('facilities')
export class ApiFacilitiesApiController {
    constructor(private facilityService: ApiFacilitiesRepositoryDataAccessService) {}

    @Get('/desk/:deskId')
    async getFacilitiesForDesk(@Param('deskId') deskId: string) {
        return this.facilityService.getFacilitiesForDesk(Number(deskId));
    }

    @Put('/desk/:deskId')
    async updateFacilitiesForDesk(@Param('deskId') deskId: string, @Body() updateFacilitiesDto: UpdateFacilitiesDto) {
        const {plugs, monitors, projectors} = updateFacilitiesDto;
        return this.facilityService.updateFacilitiesForDesk(Number(deskId), Number(plugs), Number(monitors), Number(projectors));
    }

    @Post('/')
    async createFacilitiesForDesk(@Body() CreateFacilitiesDto: CreateFacilitiesDto) {
        const {plugs, monitors, projectors, deskId} = CreateFacilitiesDto;
        return this.facilityService.createFacilitiesForDesk({
            plugs: plugs,
            monitors: monitors,
            projectors: projectors,
            Desk: {
                connect: {
                    id: Number(deskId),
                },
            },
        });
    }
    
}

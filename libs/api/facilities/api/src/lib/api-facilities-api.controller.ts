import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiFacilitiesRepositoryDataAccessService } from '@office-booker/api/facilities/repository/data-access';

@UseGuards(AuthGuard('jwt'))
@Controller('facilities')
export class ApiFacilitiesApiController {
    constructor(private facilityService: ApiFacilitiesRepositoryDataAccessService) {}

    @Get('/desk/:deskId')
    async getFacilitiesForDesk(@Param('deskId') deskId: string) {
        return await this.facilityService.getFacilitiesForDesk(Number(deskId));
    }

}

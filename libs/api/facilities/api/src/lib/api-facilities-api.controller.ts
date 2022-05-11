import { Controller, Get, Param } from '@nestjs/common';
import { ApiFacilitiesRepositoryDataAccessService } from '@office-booker/api/facilities/repository/data-access';

@Controller('facilities')
export class ApiFacilitiesApiController {
    constructor(private facilityService: ApiFacilitiesRepositoryDataAccessService) {}

    @Get('/desk/:deskId')
    async getFacilitiesForDesk(@Param('deskId') deskId: string) {
        return await this.facilityService.getFacilitiesForDesk(Number(deskId));
    }

}

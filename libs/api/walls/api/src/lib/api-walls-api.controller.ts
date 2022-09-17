import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiWallsDataAccessService } from '@office-booker/api/walls/data-access';

@UseGuards(AuthGuard('jwt'))
@Controller('walls')
export class ApiWallsApiController {
    constructor(private wallService: ApiWallsDataAccessService) {}

    
}

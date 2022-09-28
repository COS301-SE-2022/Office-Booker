import { Controller, Get, Param } from '@nestjs/common';
import { ApiCompaniesRepositoryDataAccessService } from '@office-booker/api/companies/repository/data-access';

//@UseGuards(AuthGuard('jwt')) no guard becuase its needed for sign in
@Controller('companies')
export class ApiCompaniesApiController {
    constructor(private companyService: ApiCompaniesRepositoryDataAccessService) {}

    @Get('/')
    async getCompanies() {
        return this.companyService.getCompanies();
    }

    @Get('/:companyId')
    async getCompanyById(@Param('companyId') companyId: string) {

        return this.companyService.getCompanyById(Number(companyId));
    }    

}

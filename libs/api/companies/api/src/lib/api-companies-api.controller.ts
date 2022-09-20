import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiCompaniesRepositoryDataAccessService } from '@office-booker/api/companies/repository/data-access';

//@UseGuards(AuthGuard('jwt'))
@Controller('companies')
export class ApiCompaniesApiController {
    constructor(private companyService: ApiCompaniesRepositoryDataAccessService) {}

    @Get('/')
    async getCompanies() {
        return await this.companyService.getCompanies();
    }

    @Get('/:companyId')
    async getCompanyById(@Param('companyId') companyId: string) {
        return await this.companyService.getCompanyById(Number(companyId));
    }
    

    
}

import { Injectable, Param } from '@nestjs/common';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';

@Injectable()
export class ApiCompaniesRepositoryDataAccessService {
    constructor(private prisma: PrismaService) {}

    async getCompanies() {
        return this.prisma.company.findMany();
    }

    async getCompanyById(@Param() companyId: number) {
        return this.prisma.company.findUnique({
            where: {
                id: companyId,
            },
        });
    }
}

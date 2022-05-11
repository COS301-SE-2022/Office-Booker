import { Injectable, Param } from '@nestjs/common';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';

@Injectable()
export class ApiFacilitiesRepositoryDataAccessService {
    constructor(private prisma: PrismaService) {}

    // get facilities of a desk
    async getFacilitiesForDesk(@Param() deskId: number) {
        return this.prisma.facility.findMany({
            where: {
                deskId,
            },
        });
    }
}

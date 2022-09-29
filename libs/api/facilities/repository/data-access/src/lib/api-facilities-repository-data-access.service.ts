import { Injectable, Param } from '@nestjs/common';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';
import { Prisma } from '@prisma/client';

@Injectable()
export class ApiFacilitiesRepositoryDataAccessService {
    constructor(private prisma: PrismaService) { }

    // get facilities of a desk
    async getFacilitiesForDesk(@Param() deskId: number) {
        return this.prisma.facility.findMany({
            where: {
                deskId,
            },
        });
    }

    async updateFacilitiesForDesk(@Param() deskId: number, updatePlugs: number,
        updateMonitors: number, updateProjectors: number) {
        return this.prisma.facility.updateMany({
            where: {
                deskId: deskId,
            },
            data: {
                plugs: updatePlugs,
                monitors: updateMonitors,
                projectors: updateProjectors,
            },
        });
    }

    async createFacilitiesForDesk(facility: Prisma.FacilityCreateInput) {
            return this.prisma.facility.create({
                data: facility,
            });
        }
}

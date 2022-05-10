import { Module } from '@nestjs/common';
import { ApiSharedServicesPrismaDataAccessService } from './api-shared-services-prisma-data-access.service';

@Module({
  controllers: [],
  providers: [ApiSharedServicesPrismaDataAccessService],
  exports: [ApiSharedServicesPrismaDataAccessService],
})
export class ApiSharedServicesPrismaDataAccessModule {}

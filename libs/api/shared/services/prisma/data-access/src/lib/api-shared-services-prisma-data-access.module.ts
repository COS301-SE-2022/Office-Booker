import { Module } from '@nestjs/common';
import { PrismaService } from './api-shared-services-prisma-data-access.service';

@Module({
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class ApiSharedServicesPrismaDataAccessModule {}

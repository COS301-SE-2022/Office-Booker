import { Module } from '@nestjs/common';
import { ApiFacilitiesRepositoryDataAccessService } from './api-facilities-repository-data-access.service';

@Module({
  controllers: [],
  providers: [ApiFacilitiesRepositoryDataAccessService],
  exports: [ApiFacilitiesRepositoryDataAccessService],
})
export class ApiFacilitiesRepositoryDataAccessModule {}

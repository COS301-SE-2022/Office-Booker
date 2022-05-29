import { Module } from '@nestjs/common';
import { ApiCompaniesRepositoryDataAccessService } from './api-companies-repository-data-access.service';

@Module({
  controllers: [],
  providers: [ApiCompaniesRepositoryDataAccessService],
  exports: [ApiCompaniesRepositoryDataAccessService],
})
export class ApiCompaniesRepositoryDataAccessModule {}

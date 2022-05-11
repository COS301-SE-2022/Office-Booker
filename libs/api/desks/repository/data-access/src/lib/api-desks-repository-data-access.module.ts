import { Module } from '@nestjs/common';
import { ApiDesksRepositoryDataAccessService } from './api-desks-repository-data-access.service';

@Module({
  controllers: [],
  providers: [ApiDesksRepositoryDataAccessService],
  exports: [ApiDesksRepositoryDataAccessService],
})
export class ApiDesksRepositoryDataAccessModule {}

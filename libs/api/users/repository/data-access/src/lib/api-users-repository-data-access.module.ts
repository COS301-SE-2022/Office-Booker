import { Module } from '@nestjs/common';
import { ApiUsersRepositoryDataAccessService } from './api-users-repository-data-access.service';

@Module({
  controllers: [],
  providers: [ApiUsersRepositoryDataAccessService],
  exports: [ApiUsersRepositoryDataAccessService],
})
export class ApiUsersRepositoryDataAccessModule {}

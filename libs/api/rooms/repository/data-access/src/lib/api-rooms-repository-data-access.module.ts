import { Module } from '@nestjs/common';
import { ApiRoomsRepositoryDataAccessService } from './api-rooms-repository-data-access.service';

@Module({
  controllers: [],
  providers: [ApiRoomsRepositoryDataAccessService],
  exports: [ApiRoomsRepositoryDataAccessService],
})
export class ApiRoomsRepositoryDataAccessModule {}

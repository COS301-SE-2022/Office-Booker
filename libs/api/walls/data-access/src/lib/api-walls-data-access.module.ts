import { Module } from '@nestjs/common';
import { ApiWallsDataAccessService } from './api-walls-data-access.service';

@Module({
  controllers: [],
  providers: [ApiWallsDataAccessService],
  exports: [ApiWallsDataAccessService],
})
export class ApiWallsDataAccessModule {}

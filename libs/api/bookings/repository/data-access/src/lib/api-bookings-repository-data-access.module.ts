import { Module } from '@nestjs/common';
import { ApiBookingsRepositoryDataAccessService } from './api-bookings-repository-data-access.service';

@Module({
  controllers: [],
  providers: [ApiBookingsRepositoryDataAccessService],
  exports: [ApiBookingsRepositoryDataAccessService],
})
export class ApiBookingsRepositoryDataAccessModule {}

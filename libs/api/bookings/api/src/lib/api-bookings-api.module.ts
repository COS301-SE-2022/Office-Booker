import { Module } from '@nestjs/common';
import { ApiBookingsApiController } from './api-bookings-api.controller';

@Module({
  controllers: [ApiBookingsApiController],
  providers: [],
  exports: [],
})
export class ApiBookingsApiModule {}

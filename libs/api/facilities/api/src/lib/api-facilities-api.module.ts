import { Module } from '@nestjs/common';
import { ApiFacilitiesApiController } from './api-facilities-api.controller';

@Module({
  controllers: [ApiFacilitiesApiController],
  providers: [],
  exports: [],
})
export class ApiFacilitiesApiModule {}

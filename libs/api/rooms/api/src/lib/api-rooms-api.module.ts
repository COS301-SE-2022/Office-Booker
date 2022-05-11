import { Module } from '@nestjs/common';
import { ApiRoomsApiController } from './api-rooms-api.controller';

@Module({
  controllers: [ApiRoomsApiController],
  providers: [],
  exports: [],
})
export class ApiRoomsApiModule {}

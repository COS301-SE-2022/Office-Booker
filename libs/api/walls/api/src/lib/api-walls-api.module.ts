import { Module } from '@nestjs/common';
import { ApiWallsApiController } from './api-walls-api.controller';

@Module({
  controllers: [ApiWallsApiController],
  providers: [],
  exports: [],
})
export class ApiWallsApiModule {}

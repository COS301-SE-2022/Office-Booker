import { Module } from '@nestjs/common';
import { ApiDesksApiController } from './api-desks-api.controller';

@Module({
  controllers: [ApiDesksApiController],
  providers: [],
  exports: [],
})
export class ApiDesksApiModule {}

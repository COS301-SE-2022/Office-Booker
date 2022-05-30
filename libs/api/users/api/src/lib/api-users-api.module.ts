import { Module } from '@nestjs/common';
import { ApiUsersApiController } from './api-users-api.controller';

@Module({
  controllers: [ApiUsersApiController],
  providers: [],
  exports: [],
})
export class ApiUsersApiModule {}

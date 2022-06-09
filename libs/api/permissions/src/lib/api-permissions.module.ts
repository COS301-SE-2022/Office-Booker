import { Module } from '@nestjs/common';
import { ApiPermissionsService } from './api-permissions.service';

@Module({
  controllers: [],
  providers: [ApiPermissionsService],
  exports: [ApiPermissionsService],
})
export class ApiPermissionsModule {}

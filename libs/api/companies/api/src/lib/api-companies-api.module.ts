import { Module } from '@nestjs/common';
import { ApiCompaniesApiController } from './api-companies-api.controller';

@Module({
  controllers: [ApiCompaniesApiController],
  providers: [],
  exports: [],
})
export class ApiCompaniesApiModule {}

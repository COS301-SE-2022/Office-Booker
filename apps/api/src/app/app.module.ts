import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiBookingsApiController } from '@office-booker/api/bookings/api';
import { ApiBookingsRepositoryDataAccessService } from '@office-booker/api/bookings/repository/data-access';
import { ApiDesksApiController } from '@office-booker/api/desks/api';
import { ApiDesksRepositoryDataAccessService } from '@office-booker/api/desks/repository/data-access';
import { ApiFacilitiesApiController } from '@office-booker/api/facilities/api';
import { ApiFacilitiesRepositoryDataAccessService } from '@office-booker/api/facilities/repository/data-access';
import { ApiRoomsApiController } from '@office-booker/api/rooms/api';
import { ApiRoomsRepositoryDataAccessService } from '@office-booker/api/rooms/repository/data-access';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';
import { ApiCompaniesApiController } from '@office-booker/api/companies/api';
import { ApiUsersApiController } from '@office-booker/api/users/api';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiCompaniesRepositoryDataAccessService } from '@office-booker/api/companies/repository/data-access';
import { ApiUsersRepositoryDataAccessService } from '@office-booker/api/users/repository/data-access';
import { ApiAuthorizationModule } from '@office-booker/api/authorization';

@Module({
  imports: [ApiAuthorizationModule, ConfigModule.forRoot({
    isGlobal: true,
  })],
  controllers: [AppController, ApiRoomsApiController, ApiDesksApiController, ApiFacilitiesApiController, ApiBookingsApiController, ApiCompaniesApiController, ApiUsersApiController],
  providers: [AppService, PrismaService, ApiRoomsRepositoryDataAccessService, ApiDesksRepositoryDataAccessService, ApiFacilitiesRepositoryDataAccessService, ApiBookingsRepositoryDataAccessService, ApiCompaniesRepositoryDataAccessService, ApiUsersRepositoryDataAccessService],
})
export class AppModule {}

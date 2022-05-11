import { Module } from '@nestjs/common';
import { ApiBookingsApiController } from '@office-booker/api/bookings/api';
import { ApiBookingsRepositoryDataAccessService } from '@office-booker/api/bookings/repository/data-access';
import { ApiDesksApiController } from '@office-booker/api/desks/api';
import { ApiDesksRepositoryDataAccessService } from '@office-booker/api/desks/repository/data-access';
import { ApiFacilitiesApiController } from '@office-booker/api/facilities/api';
import { ApiFacilitiesRepositoryDataAccessService } from '@office-booker/api/facilities/repository/data-access';
import { ApiRoomsApiController } from '@office-booker/api/rooms/api';
import { ApiRoomsRepositoryDataAccessService } from '@office-booker/api/rooms/repository/data-access';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, ApiRoomsApiController, ApiDesksApiController, ApiFacilitiesApiController, ApiBookingsApiController],
  providers: [AppService, PrismaService, ApiRoomsRepositoryDataAccessService, ApiDesksRepositoryDataAccessService, ApiFacilitiesRepositoryDataAccessService, ApiBookingsRepositoryDataAccessService],
})
export class AppModule {}

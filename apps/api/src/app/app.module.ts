import { Module } from '@nestjs/common';
import { ApiRoomsApiController } from '@office-booker/api/rooms/api';
import { ApiRoomsRepositoryDataAccessService } from '@office-booker/api/rooms/repository/data-access';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, ApiRoomsApiController],
  providers: [AppService, PrismaService, ApiRoomsRepositoryDataAccessService],
})
export class AppModule {}

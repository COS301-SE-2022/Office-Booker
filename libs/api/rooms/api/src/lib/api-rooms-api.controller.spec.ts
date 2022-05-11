import { Test } from '@nestjs/testing';
import { ApiRoomsRepositoryDataAccessService } from '@office-booker/api/rooms/repository/data-access';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';
import { ApiRoomsApiController } from './api-rooms-api.controller';

describe('ApiRoomsApiController', () => {
  let controller: ApiRoomsApiController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiRoomsRepositoryDataAccessService, PrismaService],
      controllers: [ApiRoomsApiController],
    }).compile();

    controller = module.get(ApiRoomsApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});

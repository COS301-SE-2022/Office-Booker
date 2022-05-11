import { Test } from '@nestjs/testing';
import { ApiRoomsRepositoryDataAccessService } from '@office-booker/api/rooms/repository/data-access';
import { ApiRoomsApiController } from './api-rooms-api.controller';

describe('ApiRoomsApiController', () => {
  let controller: ApiRoomsApiController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ApiRoomsApiController, ApiRoomsRepositoryDataAccessService],
    }).compile();

    controller = module.get(ApiRoomsApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});

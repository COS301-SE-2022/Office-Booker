import { Test } from '@nestjs/testing';
import { ApiRoomsApiController } from './api-rooms-api.controller';

describe('ApiRoomsApiController', () => {
  let controller: ApiRoomsApiController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ApiRoomsApiController],
    }).compile();

    controller = module.get(ApiRoomsApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});

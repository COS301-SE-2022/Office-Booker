import { Test } from '@nestjs/testing';
import { ApiWallsApiController } from './api-walls-api.controller';

describe('ApiWallsApiController', () => {
  let controller: ApiWallsApiController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ApiWallsApiController],
    }).compile();

    controller = module.get(ApiWallsApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});

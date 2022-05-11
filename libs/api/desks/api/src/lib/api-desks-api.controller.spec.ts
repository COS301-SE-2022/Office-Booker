import { Test } from '@nestjs/testing';
import { ApiDesksApiController } from './api-desks-api.controller';

describe('ApiDesksApiController', () => {
  let controller: ApiDesksApiController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ApiDesksApiController],
    }).compile();

    controller = module.get(ApiDesksApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});

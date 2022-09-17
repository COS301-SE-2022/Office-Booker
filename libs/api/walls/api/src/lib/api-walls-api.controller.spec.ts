import { Test } from '@nestjs/testing';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';
import { ApiWallsDataAccessService } from '@office-booker/api/walls/data-access';
import { ApiWallsApiController } from './api-walls-api.controller';

describe('ApiWallsApiController', () => {
  let controller: ApiWallsApiController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiWallsDataAccessService, PrismaService],
      controllers: [ApiWallsApiController],
    }).compile();

    controller = module.get(ApiWallsApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});

import { Test } from '@nestjs/testing';
import { ApiDesksRepositoryDataAccessService } from '@office-booker/api/desks/repository/data-access';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';
import { ApiDesksApiController } from './api-desks-api.controller';

describe('ApiDesksApiController', () => {
  let controller: ApiDesksApiController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiDesksRepositoryDataAccessService, PrismaService],
      controllers: [ApiDesksApiController],
    }).compile();

    controller = module.get(ApiDesksApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});

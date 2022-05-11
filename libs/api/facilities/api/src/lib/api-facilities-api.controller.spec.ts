import { Test } from '@nestjs/testing';
import { ApiFacilitiesApiController } from './api-facilities-api.controller';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';
import { ApiFacilitiesRepositoryDataAccessService } from '@office-booker/api/facilities/repository/data-access';

describe('ApiFacilitiesApiController', () => {
  let controller: ApiFacilitiesApiController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiFacilitiesRepositoryDataAccessService, PrismaService],
      controllers: [ApiFacilitiesApiController],
    }).compile();

    controller = module.get(ApiFacilitiesApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});

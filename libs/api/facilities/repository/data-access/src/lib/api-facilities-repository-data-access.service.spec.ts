import { Test } from '@nestjs/testing';
import { ApiFacilitiesRepositoryDataAccessService } from './api-facilities-repository-data-access.service';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';

describe('ApiFacilitiesRepositoryDataAccessService', () => {
  let service: ApiFacilitiesRepositoryDataAccessService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiFacilitiesRepositoryDataAccessService, PrismaService],
    }).compile();

    service = module.get(ApiFacilitiesRepositoryDataAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});

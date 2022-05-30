import { Test } from '@nestjs/testing';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';
import { ApiCompaniesRepositoryDataAccessService } from './api-companies-repository-data-access.service';

describe('ApiCompaniesRepositoryDataAccessService', () => {
  let service: ApiCompaniesRepositoryDataAccessService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiCompaniesRepositoryDataAccessService, PrismaService],
    }).compile();

    service = module.get(ApiCompaniesRepositoryDataAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});

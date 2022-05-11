import { Test } from '@nestjs/testing';
import { ApiDesksRepositoryDataAccessService } from './api-desks-repository-data-access.service';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';
describe('ApiDesksRepositoryDataAccessService', () => {
  let service: ApiDesksRepositoryDataAccessService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiDesksRepositoryDataAccessService, PrismaService],
    }).compile();

    service = module.get(ApiDesksRepositoryDataAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});

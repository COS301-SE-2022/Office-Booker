import { Test } from '@nestjs/testing';
import { ApiSharedServicesPrismaDataAccessService } from './api-shared-services-prisma-data-access.service';

describe('ApiSharedServicesPrismaDataAccessService', () => {
  let service: ApiSharedServicesPrismaDataAccessService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiSharedServicesPrismaDataAccessService],
    }).compile();

    service = module.get(ApiSharedServicesPrismaDataAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});

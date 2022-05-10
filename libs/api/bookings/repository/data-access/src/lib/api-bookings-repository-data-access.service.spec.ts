import { Test } from '@nestjs/testing';
import { ApiBookingsRepositoryDataAccessService } from './api-bookings-repository-data-access.service';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';

describe('ApiBookingsRepositoryDataAccessService', () => {
  let service: ApiBookingsRepositoryDataAccessService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiBookingsRepositoryDataAccessService, PrismaService],
    }).compile();

    service = module.get(ApiBookingsRepositoryDataAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});

import { Test } from '@nestjs/testing';
import { ApiBookingsRepositoryDataAccessService } from './api-bookings-repository-data-access.service';

describe('ApiBookingsRepositoryDataAccessService', () => {
  let service: ApiBookingsRepositoryDataAccessService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiBookingsRepositoryDataAccessService],
    }).compile();

    service = module.get(ApiBookingsRepositoryDataAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});

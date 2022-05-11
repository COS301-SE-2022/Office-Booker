import { Test } from '@nestjs/testing';
import { ApiBookingsRepositoryDataAccessService } from '@office-booker/api/bookings/repository/data-access';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';
import { ApiBookingsApiController } from './api-bookings-api.controller';

describe('ApiBookingsApiController', () => {
  let controller: ApiBookingsApiController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiBookingsRepositoryDataAccessService, PrismaService],
      controllers: [ApiBookingsApiController],
    }).compile();

    controller = module.get(ApiBookingsApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});

import { Test } from '@nestjs/testing';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';
import { ApiWallsDataAccessService } from './api-walls-data-access.service';

describe('ApiWallsDataAccessService', () => {
  let service: ApiWallsDataAccessService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiWallsDataAccessService, PrismaService],
    }).compile();

    service = module.get(ApiWallsDataAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});

import { Test } from '@nestjs/testing';
import { ApiRoomsRepositoryDataAccessService } from './api-rooms-repository-data-access.service';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';

describe('ApiRoomsRepositoryDataAccessService', () => {
  let service: ApiRoomsRepositoryDataAccessService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiRoomsRepositoryDataAccessService, PrismaService],
    }).compile();

    service = module.get(ApiRoomsRepositoryDataAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});

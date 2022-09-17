import { Test } from '@nestjs/testing';
import { ApiWallsDataAccessService } from './api-walls-data-access.service';

describe('ApiWallsDataAccessService', () => {
  let service: ApiWallsDataAccessService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiWallsDataAccessService],
    }).compile();

    service = module.get(ApiWallsDataAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});

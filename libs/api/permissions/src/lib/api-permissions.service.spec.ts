import { Test } from '@nestjs/testing';
import { ApiPermissionsService } from './api-permissions-.service';

describe('ApiPermissionsService', () => {
  let service: ApiPermissionsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiPermissionsService],
    }).compile();

    service = module.get(ApiPermissionsService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});

import { Test } from '@nestjs/testing';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';
import { ApiUsersRepositoryDataAccessService } from '@office-booker/api/users/repository/data-access';
import { ApiUsersApiController } from './api-users-api.controller';

describe('ApiUsersApiController', () => {
  let controller: ApiUsersApiController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiUsersRepositoryDataAccessService, PrismaService],
      controllers: [ApiUsersApiController],
    }).compile();

    controller = module.get(ApiUsersApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});

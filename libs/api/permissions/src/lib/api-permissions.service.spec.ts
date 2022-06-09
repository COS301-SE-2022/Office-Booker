import { Test } from '@nestjs/testing';
import { ApiCompaniesRepositoryDataAccessService } from '@office-booker/api/companies/repository/data-access';
import { ApiDesksRepositoryDataAccessService } from '@office-booker/api/desks/repository/data-access';
import { ApiRoomsRepositoryDataAccessService } from '@office-booker/api/rooms/repository/data-access';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';
import { ApiUsersRepositoryDataAccessService } from '@office-booker/api/users/repository/data-access';
import { ApiPermissionsService } from './api-permissions.service';

describe('ApiPermissionsService', () => {
  let service: ApiPermissionsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiPermissionsService, ApiUsersRepositoryDataAccessService, ApiCompaniesRepositoryDataAccessService, ApiDesksRepositoryDataAccessService, ApiRoomsRepositoryDataAccessService, PrismaService],
    }).compile();

    service = module.get(ApiPermissionsService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});

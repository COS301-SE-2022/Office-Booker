import { Test } from '@nestjs/testing';
import { ApiCompaniesRepositoryDataAccessService } from '@office-booker/api/companies/repository/data-access';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';
import { ApiCompaniesApiController } from './api-companies-api.controller';

describe('ApiCompaniesApiController', () => {
  let controller: ApiCompaniesApiController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiCompaniesRepositoryDataAccessService, PrismaService],
      controllers: [ApiCompaniesApiController],
    }).compile();

    controller = module.get(ApiCompaniesApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});

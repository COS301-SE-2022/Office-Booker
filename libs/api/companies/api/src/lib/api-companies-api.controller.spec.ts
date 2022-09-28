import { Test, TestingModule } from '@nestjs/testing';
import { ApiCompaniesRepositoryDataAccessService } from '@office-booker/api/companies/repository/data-access';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';
import { ApiCompaniesApiController } from './api-companies-api.controller';

describe('ApiCompaniesApiController', () => {
  let controller: ApiCompaniesApiController;
  let service: ApiCompaniesRepositoryDataAccessService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: ApiCompaniesRepositoryDataAccessService,
      useFactory: () => ({
        getCompanies: jest.fn(() => []),
        getCompanyById: jest.fn(() => ({})),
      })
    }
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApiCompaniesApiController],
      providers: [ApiCompaniesRepositoryDataAccessService, ApiServiceProvider, PrismaService],
    }).compile();
    controller = app.get<ApiCompaniesApiController>(ApiCompaniesApiController);
    service = app.get<ApiCompaniesRepositoryDataAccessService>(ApiCompaniesRepositoryDataAccessService);
  });

  it('should call getCompanies method', () => {
    controller.getCompanies();
    expect(service.getCompanies).toHaveBeenCalled();
  });

  it('should call getCompanyById method', () => {
    const companyId = "1";
    controller.getCompanyById(companyId);
    expect(service.getCompanyById).toHaveBeenCalledWith(Number(companyId));
  });
});

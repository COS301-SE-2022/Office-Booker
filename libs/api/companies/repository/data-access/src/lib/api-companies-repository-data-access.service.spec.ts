import { Test } from '@nestjs/testing';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';
import { ApiCompaniesRepositoryDataAccessService } from './api-companies-repository-data-access.service';

describe('ApiCompaniesRepositoryDataAccessService', () => {
  let service: ApiCompaniesRepositoryDataAccessService;
  let prisma;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiCompaniesRepositoryDataAccessService, PrismaService],
    }).compile();
    service = module.get<ApiCompaniesRepositoryDataAccessService>(ApiCompaniesRepositoryDataAccessService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('getCompanies', () => {
    it('should return an array of companies', async () => {
      const companies = [
        {
          id: 1,
          name: 'Apple',
          Rooms: null,
          Employee: null,
          domain: "apple.com"
        },
        {
          id: 2,
          name: 'Microsoft',
          Rooms: null,
          Employee: null,
          domain: "microsoft.com"
        },
      ];
      prisma.company.findMany = jest.fn().mockReturnValue(companies);
      const result = await service.getCompanies();
      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThan(0);
      expect(result).toEqual(companies);
    });
  });

  describe('getCompanyById', () => {
    it('should return a company', async () => {
      const company = {
        id: 1,
        name: 'Apple',
        Rooms: null,
        Employee: null,
        Domain: "apple.com"
      };
      prisma.company.findUnique = jest.fn().mockReturnValue(company);
      const result = await service.getCompanyById(1);
      expect(result).toBeDefined();
      expect(result).toEqual(company);
    });
  });

  /*beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiCompaniesRepositoryDataAccessService, PrismaService],
    }).compile();

    service = module.get(ApiCompaniesRepositoryDataAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });*/
});

import { Test, TestingModule } from '@nestjs/testing';
import { ApiFacilitiesApiController } from './api-facilities-api.controller';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';
import { ApiFacilitiesRepositoryDataAccessService } from '@office-booker/api/facilities/repository/data-access';

describe('ApiFacilitiesApiController', () => {
  let controller: ApiFacilitiesApiController;
  let service: ApiFacilitiesRepositoryDataAccessService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: ApiFacilitiesRepositoryDataAccessService,
      useFactory: () => ({
        getFacilitiesForDesk: jest.fn(() => []),
      })
    }
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApiFacilitiesApiController],
      providers: [ApiFacilitiesRepositoryDataAccessService, ApiServiceProvider, PrismaService],
    }).compile();
    controller = app.get<ApiFacilitiesApiController>(ApiFacilitiesApiController);
    service = app.get<ApiFacilitiesRepositoryDataAccessService>(ApiFacilitiesRepositoryDataAccessService);
  });

  it('Should call getFacilitiesForDesk method', () => {
    const deskId = "1";
    controller.getFacilitiesForDesk(deskId);
    expect(service.getFacilitiesForDesk).toHaveBeenCalledWith(Number(deskId));
  });
});

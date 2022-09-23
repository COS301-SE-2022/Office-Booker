import { Test, TestingModule } from '@nestjs/testing';
import { ApiFacilitiesApiController } from './api-facilities-api.controller';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';
import { ApiFacilitiesRepositoryDataAccessService } from '@office-booker/api/facilities/repository/data-access';

describe('ApiFacilitiesApiController Unit Testing', () => {
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

describe('ApiFacilitiesApiController Integration Testing', () => {
  let controller: ApiFacilitiesApiController;
  let service: ApiFacilitiesRepositoryDataAccessService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApiFacilitiesApiController],
      providers: [ApiFacilitiesRepositoryDataAccessService, PrismaService],
    }).compile();
    controller = app.get<ApiFacilitiesApiController>(ApiFacilitiesApiController);
    service = app.get<ApiFacilitiesRepositoryDataAccessService>(ApiFacilitiesRepositoryDataAccessService);
  });

  it('Should call getFacilitiesForDesk method', async () => {
    const res = await controller.getFacilitiesForDesk('28');
    expect(res).toEqual([{ id: 4, deskId: 28, plugs: 1, monitors: 2, projectors: 0 }]);
  });
});

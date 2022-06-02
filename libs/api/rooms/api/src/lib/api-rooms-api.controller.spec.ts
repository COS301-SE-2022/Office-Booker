import { Test, TestingModule } from '@nestjs/testing';
import { ApiRoomsRepositoryDataAccessService } from '@office-booker/api/rooms/repository/data-access';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';
import { ApiRoomsApiController } from './api-rooms-api.controller';

describe('ApiRoomsApiController', () => {
  let controller: ApiRoomsApiController;
  let service: ApiRoomsRepositoryDataAccessService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: ApiRoomsRepositoryDataAccessService,
      useFactory: () => ({
        getRooms: jest.fn(() => []),
        getRoomById: jest.fn(() => ({})),
      })
    }
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApiRoomsApiController],
      providers: [ApiRoomsRepositoryDataAccessService, ApiServiceProvider, PrismaService],
    }).compile();
    controller = app.get<ApiRoomsApiController>(ApiRoomsApiController);
    service = app.get<ApiRoomsRepositoryDataAccessService>(ApiRoomsRepositoryDataAccessService);
  });

  it("calling getRooms method", () => {
    controller.getAll();
    expect(service.getRooms).toHaveBeenCalled();
  })

  it("calling getRoomById method", () => {
    const roomId = "1";
    controller.getRoomById(roomId);
    expect(service.getRoomById).toHaveBeenCalledWith(Number(roomId));
  })
});



/*describe('ApiRoomsApiController', () => {
  let controller: ApiRoomsApiController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiRoomsRepositoryDataAccessService, PrismaService],
      controllers: [ApiRoomsApiController],
    }).compile();

    controller = module.get(ApiRoomsApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});*/

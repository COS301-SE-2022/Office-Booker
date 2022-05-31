import { Test, TestingModule } from '@nestjs/testing';
import { ApiDesksRepositoryDataAccessService } from '@office-booker/api/desks/repository/data-access';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';
import { ApiDesksApiController } from './api-desks-api.controller';

describe('ApiDesksApiController', () => {
  let controller: ApiDesksApiController;
  let service: ApiDesksRepositoryDataAccessService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: ApiDesksRepositoryDataAccessService,
      useFactory: () => ({
        getDesks: jest.fn(() => []),
        getDeskById: jest.fn(() => ({})),
        getDesksInRoom: jest.fn(() => []),
      })
    }
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApiDesksApiController],
      providers: [ApiDesksRepositoryDataAccessService, ApiServiceProvider, PrismaService],
    }).compile();
    controller = app.get<ApiDesksApiController>(ApiDesksApiController);
    service = app.get<ApiDesksRepositoryDataAccessService>(ApiDesksRepositoryDataAccessService);
  });

  it("calling getDesks method", () => {
    controller.getAll();
    expect(service.getDesks).toHaveBeenCalled();
  })

  it("calling getDeskById method", () => {
    const roomId = "1";
    controller.getDesksInRoom(roomId);
    expect(service.getDesksInRoom).toHaveBeenCalledWith(Number(roomId));
  })
});

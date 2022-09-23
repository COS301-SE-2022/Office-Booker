import { Test, TestingModule } from '@nestjs/testing';
import { ApiDesksRepositoryDataAccessService } from '@office-booker/api/desks/repository/data-access';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';
import { ApiDesksApiController } from './api-desks-api.controller';

describe('ApiDesksApiController Unit Testing', () => {
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

describe('ApiDesksApiController Integration Testing', () => {
  let controller: ApiDesksApiController;
  let service: ApiDesksRepositoryDataAccessService;

  class createDeskDto {
    roomId: number;
    LocationRow: number;
    LocationCol: number;
    Height: number;
    Width: number;
    isMeetingRoom: boolean;
    capacity: number;
}

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApiDesksApiController],
      providers: [ApiDesksRepositoryDataAccessService, PrismaService],
    }).compile();
    controller = app.get<ApiDesksApiController>(ApiDesksApiController);
    service = app.get<ApiDesksRepositoryDataAccessService>(ApiDesksRepositoryDataAccessService);
  });  

  it("testing getDesks method", async () => {
    const res = await controller.getAll();
    expect(res.length).toBeGreaterThan(0);
  })

  it("testing getDeskByRoomId method", async () => {
    const res = await controller.getDesksInRoom('3');
    expect(res).toEqual([
      {
        id: 28,
        roomId: 3,
        LocationRow: 0,
        LocationCol: 540,
        Height: 200,
        Width: 300,
        isMeetingRoom: true,
        capacity: 10
      },
      {
        id: 29,
        roomId: 3,
        LocationRow: 210,
        LocationCol: 0,
        Height: 50,
        Width: 30,
        isMeetingRoom: false,
        capacity: 15
      }
    ]);
  })
});

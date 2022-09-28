import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';
import { ApiWallsDataAccessService } from '@office-booker/api/walls/data-access';
import { ApiWallsApiController } from './api-walls-api.controller';

class createWallDto {
  roomId: number;
  Pos1X: number;
  Pos1Y: number;
  Pos2X: number;
  Pos2Y: number;
}

describe('ApiWallsApiController Unit Tests', () => {
  let controller: ApiWallsApiController;
  let service: ApiWallsDataAccessService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: ApiWallsDataAccessService,
      useFactory: () => ({
        getWallsInRoom: jest.fn(() => []),
        getWallById: jest.fn(() => ({}))
      })
    }
    const app: TestingModule = await Test.createTestingModule({
      providers: [ApiWallsDataAccessService, ApiServiceProvider, PrismaService],
      controllers: [ApiWallsApiController],
    }).compile();
    controller = app.get<ApiWallsApiController>(ApiWallsApiController);
    service = app.get<ApiWallsDataAccessService>(ApiWallsDataAccessService);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });

  it("calling getWallsInRoom Method", () => {
    controller.getWallsInRoom('5');
    expect(service.getWallsInRoom).toHaveBeenCalled();
  });

  // it("calling getWallsById method", () => {
  //   controller.getWallsById('5');
  //   expect(service.getWallbyId).toHaveBeenCalled();
  // });

  // it("calling createWall method", () => {
  //   const wall: createWallDto = {
  //     roomId: 1,
  //     Pos1X: 1,
  //     Pos1Y: 1,
  //     Pos2X: 1,
  //     Pos2Y: 1
  //   }
  //   controller.createWall(wall);
  //   expect(service.createWall).toHaveBeenCalled();
  // });
});

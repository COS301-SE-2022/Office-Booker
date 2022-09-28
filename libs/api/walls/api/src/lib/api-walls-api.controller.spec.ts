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
});

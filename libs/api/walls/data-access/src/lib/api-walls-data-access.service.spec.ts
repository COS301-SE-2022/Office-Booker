import { Test } from '@nestjs/testing';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';
import { ApiWallsDataAccessService } from './api-walls-data-access.service';

describe('ApiWallsDataAccessService', () => {
  let service: ApiWallsDataAccessService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiWallsDataAccessService, PrismaService],
    }).compile();

    service = module.get(ApiWallsDataAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});

describe('ApiWallsDataAccessService Integration Testing', () => {
  let service: ApiWallsDataAccessService;
  let prisma;
  let testCompany;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiWallsDataAccessService, PrismaService],
    }).compile();

    service = module.get<ApiWallsDataAccessService>(ApiWallsDataAccessService);
    prisma = module.get<PrismaService>(PrismaService);
    
  });

  it('should get all walls in a room', async () => {
    const walls = [
      {
        id: 1,
        Pos1X: 1,
        Pos1Y: 1,
        Pos2X: 1,
        Pos2Y: 1,
        roomId: 1,
      },
      {
        id: 1,
        Pos1X: 2,
        Pos1Y: 2,
        Pos2X: 2,
        Pos2Y: 2,
        roomId: 1,
      },
      {
        id: 1,
        Pos1X: 3,
        Pos1Y: 3,
        Pos2X: 3,
        Pos2Y: 3,
        roomId: 1,
      },
    ];
    prisma.wall.findMany = jest.fn().mockReturnValue(walls);
    const result = await service.getWallsInRoom(1);
    expect(result).toEqual(walls);
  });

  it ('should get a wall by id', async () => {
    const wall = await service.getWallbyId(1);
    expect(wall).toBeDefined();
  });

  it ('should create a wall', async () => {
    const wall = await service.createWall(1, 0, 0, 1, 1);
    expect(wall).toBeDefined();
  });

  it ('should delete a wall', async () => {
    const wall = await service.createWall(1, 0, 0, 1, 1);
    console.log(wall);
    const deletedWall = await service.deleteWall(wall.id);
    expect(deletedWall).toBeDefined();
  });

  


});
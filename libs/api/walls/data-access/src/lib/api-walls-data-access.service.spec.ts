import { Test } from '@nestjs/testing';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';
import { prisma } from '@prisma/client';
import { ApiWallsDataAccessService } from './api-walls-data-access.service';

describe('ApiWallsDataAccessService Unit Testing', () => {
  let service: ApiWallsDataAccessService;
  let prisma;

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

  it('should get a wall by id', async () => {
    prisma.wall.findUnique = jest.fn().mockReturnValue({
      id: 1,
      Pos1X: 3,
      Pos1Y: 3,
      Pos2X: 3,
      Pos2Y: 3,
      roomId: 1,
    });
    const wall = await service.getWallbyId(1);
    expect(wall).toEqual({
      id: 1,
      Pos1X: 3,
      Pos1Y: 3,
      Pos2X: 3,
      Pos2Y: 3,
      roomId: 1,
    });
  });
});
describe('ApiWallsDataAccessService Integration Testing', () => {
  let service: ApiWallsDataAccessService;
  let prisma;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiWallsDataAccessService, PrismaService],
    }).compile();

    service = module.get<ApiWallsDataAccessService>(ApiWallsDataAccessService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});


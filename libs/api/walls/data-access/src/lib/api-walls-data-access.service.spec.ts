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
  let wall1: number;
  let wall2: number;
  let wall3: number;
  let wallId: number;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiWallsDataAccessService, PrismaService],
    }).compile();

    service = module.get<ApiWallsDataAccessService>(ApiWallsDataAccessService);
    prisma = module.get<PrismaService>(PrismaService);

    wall1 = (await service.createWall(3, 1, 1, 1, 1)).id;
    wall2 = (await service.createWall(3, 2, 2, 2, 2)).id;
    wall3 = (await service.createWall(3, 3, 3, 3, 3)).id;
    wallId = wall1;
  });

  afterEach(async () => {
    await service.deleteWall(wall1);
    await service.deleteWall(wall2);
    await service.deleteWall(wall3);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should get all walls in a room', async () => {
    const res = await service.getWallsInRoom(3);
    expect(res.length).toEqual(3);
  });

  it('should get a wall by id', async () => {
    const res = await  service.getWallbyId(wallId);
    expect(res.id).toEqual(wallId);
  });
});


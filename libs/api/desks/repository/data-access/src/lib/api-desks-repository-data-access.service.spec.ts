import { Test, TestingModule } from '@nestjs/testing';
import { ApiDesksRepositoryDataAccessService } from './api-desks-repository-data-access.service';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';
import { NotFoundException } from '@nestjs/common';
import exp = require('constants');
import * as crypto from 'crypto';
describe('ApiDesksRepositoryDataAccessService', () => {
  let service: ApiDesksRepositoryDataAccessService;
  let prisma;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiDesksRepositoryDataAccessService, PrismaService],
    }).compile();

    service = await module.get<ApiDesksRepositoryDataAccessService>(ApiDesksRepositoryDataAccessService);
    prisma = await module.get<PrismaService>(PrismaService);
  });

  describe('getDesks', () => {
    it('should return an array of desks', async () => {
      prisma.desk.findMany = jest.fn().mockReturnValue([{ "LocationCol": 2, "LocationRow": 2, "id": 2, "roomId": 1 }, { "LocationCol": 1, "LocationRow": 1, "id": 1, "roomId": 1 }]);
      expect(await (await service.getDesks()).length).toBeGreaterThan(0);
      expect(await service.getDesks()).toEqual([{ "LocationCol": 2, "LocationRow": 2, "id": 2, "roomId": 1 }, { "LocationCol": 1, "LocationRow": 1, "id": 1, "roomId": 1 }]);
    });
  });

  describe('getDesksInRoom', () => {
    it('should return an array of desks in a room', async () => {
      prisma.desk.findMany = jest.fn().mockReturnValue([{ "LocationCol": 2, "LocationRow": 2, "id": 2, "roomId": 1 }, { "LocationCol": 1, "LocationRow": 1, "id": 1, "roomId": 1 }]);
      expect(await (await service.getDesksInRoom(1)).length).toBeGreaterThan(0);
      expect(await service.getDesksInRoom(1)).toEqual([{ "LocationCol": 2, "LocationRow": 2, "id": 2, "roomId": 1 }, { "LocationCol": 1, "LocationRow": 1, "id": 1, "roomId": 1 }]);
      console.log(await service.getDesksInRoom(1));
    });
  });

});

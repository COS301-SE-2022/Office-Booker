import { Test, TestingModule } from '@nestjs/testing';
import { ApiRoomsRepositoryDataAccessService } from './api-rooms-repository-data-access.service';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';
import * as crypto from 'crypto';

describe('ApiRoomsRepositoryDataAccessService Unit Tests', () => {
  let service: ApiRoomsRepositoryDataAccessService;
  let prisma;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiRoomsRepositoryDataAccessService, PrismaService],
    }).compile();
    service = await module.get<ApiRoomsRepositoryDataAccessService>(ApiRoomsRepositoryDataAccessService);
    prisma = await module.get<PrismaService>(PrismaService);
  });

  describe('getRooms', () => {
    it('should return an array of rooms', async () => {
      prisma.room.findMany = jest.fn().mockReturnValue([{ id: 1, name: 'room 1', desks: null }, { id: 2, name: 'room 2', desks: null }, { id: 3, name: 'room 3', desks: null }]);
      expect(await (await service.getRooms()).length).toBeGreaterThan(0);
      expect(await service.getRooms()).toEqual([{ id: 1, name: 'room 1', desks: null }, { id: 2, name: 'room 2', desks: null }, { id: 3, name: 'room 3', desks: null }]);
    });
  });

  describe('getRoom', () => {
    it('should return a room', async () => {
      prisma.room.findUnique = jest.fn().mockReturnValue({ id: 1, name: 'room 1', desks: null });
      expect(await service.getRoomById(1)).toEqual({ id: 1, name: 'room 1', desks: null });
      expect(prisma.room.findUnique).toHaveBeenCalledWithObjectMatchingHash('b315a9cdc13f6b86864c4cbccc985e4d');
    });
  });
});

describe('ApiRoomsRepositoryDataAccessService Integration Tests', () => {
  let service: ApiRoomsRepositoryDataAccessService;
  let prisma;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiRoomsRepositoryDataAccessService, PrismaService],
    }).compile();
    service = await module.get<ApiRoomsRepositoryDataAccessService>(ApiRoomsRepositoryDataAccessService);
    prisma = await module.get<PrismaService>(PrismaService);
  });

  it('should return an array of rooms', async () => {
      const rooms = await service.getRooms();
      expect(rooms.length).toBeGreaterThan(0);
  });

  it('should return a room', async () => {
    const testRoom = { id: 3, name: 'Test Room', companyId: 4 };
    expect(await service.getRoomById(3)).toEqual(testRoom);
  });
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Matchers<R> {
      toHaveBeenCalledWithObjectMatchingHash(expected: string): CustomMatcherResult;
    }
  }
}

expect.extend({
  toHaveBeenCalledWithObjectMatchingHash(received, expected) {
    const isSpy = (received: any) =>
      received != null &&
      received.calls != null &&
      typeof received.calls.all === 'function' &&
      typeof received.calls.count === 'function';

    const receivedIsSpy = isSpy(received);

    const calls = receivedIsSpy
      ? received.calls.all().map((x: any) => x.args)
      : received.mock.calls;

    if (calls.length === 0) {
      return {
        pass: false,
        message: () => `expected the function to be called with an object that hashes to '${expected}'. Instead, the function was not called.`,
      };
    }

    if (calls[0].length === 0) {
      return {
        pass: false,
        message: () => `expected the function to be called with an object that hashes to '${expected}'. Instead, the function was called, but not with any arguments.`,
      };
    }

    const md5Hash = crypto.createHash('md5');
    const receivedHash = md5Hash.update(JSON.stringify(calls[0][0])).digest('hex');
    const pass = receivedHash === expected;

    if (pass) {
      return {
        pass: true,
        message: () => `expected the function to not be called with an object that hashes to '${expected}'. Instead, the passed object hashes to the same value.`,
      };
    } else {
      return {
        pass: false,
        message: () => `expected the function to be called with an object that hashes to '${expected}'. Instead, the passed object hashes to '${receivedHash}'.`,
      };
    }
  }
});

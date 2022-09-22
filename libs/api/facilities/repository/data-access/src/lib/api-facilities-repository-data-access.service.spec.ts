import { Test } from '@nestjs/testing';
import { ApiFacilitiesRepositoryDataAccessService } from './api-facilities-repository-data-access.service';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';
import * as crypto from 'crypto';
import { Prisma } from '@prisma/client';

describe('ApiFacilitiesRepositoryDataAccessService', () => {
  let service: ApiFacilitiesRepositoryDataAccessService;
  let prisma;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiFacilitiesRepositoryDataAccessService, PrismaService],
    }).compile();
    service = await module.get<ApiFacilitiesRepositoryDataAccessService>(ApiFacilitiesRepositoryDataAccessService);
    prisma = await module.get<PrismaService>(PrismaService);
  });

  describe('getFacilitiesForDesk', () => {
    it('should return an array of facilities', async () => {
      prisma.facility.findMany = jest.fn().mockReturnValue([
        { id: 1, Desk: null, deskId: 2, plugs: 2, monitors: 1, projectors: 0 },
        { id: 2, Desk: null, deskId: 2, plugs: 2, monitors: 3, projectors: 0 },
        { id: 3, Desk: null, deskId: 2, plugs: 5, monitors: 1, projectors: 1 }
      ]);
      expect(await (await service.getFacilitiesForDesk(2)).length).toBeGreaterThan(0);
      expect(await service.getFacilitiesForDesk(2)).toEqual([
        { id: 1, Desk: null, deskId: 2, plugs: 2, monitors: 1, projectors: 0 },
        { id: 2, Desk: null, deskId: 2, plugs: 2, monitors: 3, projectors: 0 },
        { id: 3, Desk: null, deskId: 2, plugs: 5, monitors: 1, projectors: 1 }
      ]);
      expect(prisma.facility.findMany).toHaveBeenCalledWithObjectMatchingHash('248ed3d764bce50188fee61cfe1d8b12');
    });
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

describe('ApiFacilitiesRepositoryDataAccessService Integration Tests', () => {
  let service: ApiFacilitiesRepositoryDataAccessService;
  let prisma;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiFacilitiesRepositoryDataAccessService, PrismaService],
    }).compile();
    service = module.get<ApiFacilitiesRepositoryDataAccessService>(ApiFacilitiesRepositoryDataAccessService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array of facilities', async () => {
    const facilities = await service.getFacilitiesForDesk(2);
    console.log(facilities);
    expect(facilities.length).toBeGreaterThan(0);
    expect(facilities).toEqual([
      { id: 2, deskId: 2, plugs: 2, monitors: 1, projectors: 0 },
    ]);
  });

});



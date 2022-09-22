import { Context, ActualPrisma } from '../../../../../context';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiBookingsRepositoryDataAccessService } from './api-bookings-repository-data-access.service';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';
//'libs/api/authorization/src/lib/jwt.strategy';
import * as crypto from 'crypto';
import exp = require('constants');

describe('ApiBookingsRepositoryDataAccessService Unit Test', () => {
	let apiBookingsRepositoryDataAccessService;
	let prisma;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ApiBookingsRepositoryDataAccessService, PrismaService],
		}).compile();
		apiBookingsRepositoryDataAccessService = await module.get<ApiBookingsRepositoryDataAccessService>(ApiBookingsRepositoryDataAccessService);
		prisma = await module.get<PrismaService>(PrismaService);
	});

	describe('getBookingsForDesk unit test', () => {
		it('should get all the bookings from specified desk', async () => {
			prisma.booking.findMany = jest.fn().mockReturnValueOnce([
				{ id: 3, Desk: null, deskId: 2, createdAt: '2022-06-26T14:52:09.509Z', startsAt: '2022-05-26T14:52:09.509Z', endsAt: '2022-05-26T14:52:09.509Z' },
			]);
			expect(await apiBookingsRepositoryDataAccessService.getBookingsForDesk(2)).toEqual([{ id: 3, Desk: null, deskId: 2, createdAt: '2022-06-26T14:52:09.509Z', startsAt: '2022-05-26T14:52:09.509Z', endsAt: '2022-05-26T14:52:09.509Z' }]);
			//Custom matcher to verify that the underlying query hasn't changed and results are still valid.
			expect(prisma.booking.findMany).toHaveBeenCalledWithObjectMatchingHash('248ed3d764bce50188fee61cfe1d8b12');
		});
	});

	describe('getBookingById unit test', () => {
		it('should get a booking corresponding to a booking ID', async () => {
			prisma.booking.findUnique = jest.fn().mockReturnValueOnce([
				{ id: 3, Desk: null, deskId: 2, createdAt: '2022-06-26T14:52:09.509Z', startsAt: '2022-05-26T14:52:09.509Z', endsAt: '2022-05-26T14:52:09.509Z' },
			]);
			expect(await apiBookingsRepositoryDataAccessService.getBookingById(3)).toEqual([{ id: 3, Desk: null, deskId: 2, createdAt: '2022-06-26T14:52:09.509Z', startsAt: '2022-05-26T14:52:09.509Z', endsAt: '2022-05-26T14:52:09.509Z' }]);
			//Custom matcher to verify that the underlying query hasn't changed and results are still valid.
			expect(prisma.booking.findUnique).toHaveBeenCalledWithObjectMatchingHash('02da7733e2faeedec0dcea89ff2e52ca');
		});
	});

	describe('getCurrentBookingsForDesk unit test', () => {
		it('should return all bookings for a desk at the current time', async () => {
			prisma.booking.findMany = jest.fn().mockReturnValueOnce([
				{ id: 3, Desk: null, deskId: 2, createdAt: '2022-06-26T14:52:09.509Z', startsAt: '2022-05-26T14:52:09.509Z', endsAt: '2022-05-26T14:52:09.509Z' },
			]);
			expect(await apiBookingsRepositoryDataAccessService.getCurrentBookingsForDesk(2)).toEqual([{ id: 3, Desk: null, deskId: 2, createdAt: '2022-06-26T14:52:09.509Z', startsAt: '2022-05-26T14:52:09.509Z', endsAt: '2022-05-26T14:52:09.509Z' }]);
			//Custom matcher to verify that the underlying query hasn't changed and results are still valid.
			expect(prisma.booking.findMany).toHaveBeenCalledWithObjectMatchingHash('248ed3d764bce50188fee61cfe1d8b12');
		});
	});

	describe('createBooking unit test', () => {
		const bookingItem = [
			{ id: 3, Desk: null, deskId: 2, createdAt: '2022-06-26T14:52:09.509Z', startsAt: '2022-05-26T14:52:09.509Z', endsAt: '2022-05-26T14:52:09.509Z' },
		]
		it('should create a booking', async () => {
			prisma.booking.create = jest.fn().mockReturnValueOnce([
				bookingItem,
			]);
			expect(await apiBookingsRepositoryDataAccessService.createBooking(bookingItem)).toEqual([[{ id: 3, Desk: null, deskId: 2, createdAt: '2022-06-26T14:52:09.509Z', startsAt: '2022-05-26T14:52:09.509Z', endsAt: '2022-05-26T14:52:09.509Z' }]]);
			//Custom matcher to verify that the underlying query hasn't changed and results are still valid.
			expect(prisma.booking.create).toHaveBeenCalledWithObjectMatchingHash('8b5167eb3e2ce4173d1e9c9577910ec1');
		});
	});

	describe('deleteBooking unit test', () => {
		const bookingItem = [
			{ id: 3, Desk: null, deskId: 2, createdAt: '2022-06-26T14:52:09.509Z', startsAt: '2022-05-26T14:52:09.509Z', endsAt: '2022-05-26T14:52:09.509Z' },
		]
		it('should delete a booking of a specified booking ID', async () => {
			prisma.booking.delete = jest.fn().mockReturnValueOnce([
				bookingItem,
			]);
			expect(await apiBookingsRepositoryDataAccessService.deleteBooking(bookingItem)).toEqual([[{ id: 3, Desk: null, deskId: 2, createdAt: '2022-06-26T14:52:09.509Z', startsAt: '2022-05-26T14:52:09.509Z', endsAt: '2022-05-26T14:52:09.509Z' }]]);
			//Custom matcher to verify that the underlying query hasn't changed and results are still valid.
			expect(prisma.booking.delete).toHaveBeenCalledWithObjectMatchingHash('6aa533d8e94bba6f7491185cf76a5bbb');
		});
	});
});

describe('ApiBookingsRepositoryDataAccessService Integration Test', () => {
	let apiBookingsRepositoryDataAccessService;
	let prisma;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ApiBookingsRepositoryDataAccessService, PrismaService],
		}).compile();
		apiBookingsRepositoryDataAccessService = await module.get<ApiBookingsRepositoryDataAccessService>(ApiBookingsRepositoryDataAccessService);
		prisma = await module.get<PrismaService>(PrismaService);
	});

	describe('Testing Create, Get and delete functions - Integration', () => {
		it('should create and get a booking', async () => {
			const bookingItem = [
				{ id: 3, Desk: null, deskId: 28, createdAt: '2022-06-26T14:52:09.509Z', startsAt: '2022-05-26T14:52:09.509Z', endsAt: '2022-05-26T14:52:09.509Z' },
			]
			console.log(await apiBookingsRepositoryDataAccessService.createBooking(bookingItem));
			const result = await apiBookingsRepositoryDataAccessService.getBookingById(3);
			expect(result).toEqual(bookingItem);
		});
		it('should get all the bookings from specified desk', async () => {
			const testVal = await apiBookingsRepositoryDataAccessService.getBookingsForDesk(28);
			expect(testVal).toHaveLength(1);
		});
		it('should delete a booking and return null', async () => {
			it('should delete a booking of a specified booking ID', async () => {
				await apiBookingsRepositoryDataAccessService.deleteBooking(3);
				expect(await apiBookingsRepositoryDataAccessService.getBookingById(3).toHaveLength(0));
			});
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
		//const receivedName = receivedIsSpy ? 'spy' : received.getMockName();

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

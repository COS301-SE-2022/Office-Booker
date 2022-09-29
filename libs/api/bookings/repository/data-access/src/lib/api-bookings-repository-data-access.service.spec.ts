import { Test, TestingModule } from '@nestjs/testing';
import { ApiBookingsRepositoryDataAccessService } from './api-bookings-repository-data-access.service';
import { ApiDesksRepositoryDataAccessService } from '@office-booker/api/desks/repository/data-access';
import { ApiUsersRepositoryDataAccessService } from '@office-booker/api/users/repository/data-access';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';
import * as crypto from 'crypto';

describe('ApiBookingsRepositoryDataAccessService Unit Test', () => {
	let apiBookingsRepositoryDataAccessService;
	let prisma;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ApiBookingsRepositoryDataAccessService, PrismaService, ApiUsersRepositoryDataAccessService],
		}).compile();
		apiBookingsRepositoryDataAccessService = module.get<ApiBookingsRepositoryDataAccessService>(ApiBookingsRepositoryDataAccessService);
		prisma = module.get<PrismaService>(PrismaService);
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
	let service;
	let deskService;
	let userService;
	let receivedUser1;
	let createdDeskId;
	let createdBookingId;
	let receivedUser2
	let createdInviteId;
	let bookingToBeDeleted;
	let tempCreatedBooking;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ApiBookingsRepositoryDataAccessService, ApiDesksRepositoryDataAccessService, ApiUsersRepositoryDataAccessService, PrismaService],
		}).compile();
		service = await module.get<ApiBookingsRepositoryDataAccessService>(ApiBookingsRepositoryDataAccessService);
		deskService = await module.get<ApiDesksRepositoryDataAccessService>(ApiDesksRepositoryDataAccessService);
		userService = await module.get<ApiUsersRepositoryDataAccessService>(ApiUsersRepositoryDataAccessService);
	});

	beforeEach(async () => {
		const desk = { Room: { connect: { id: 3 }, }, LocationRow: 0, LocationCol: 0, Height: 100, Width: 100, isMeetingRoom: false, capacity: 1 };
		const createdDesk = await deskService.createDeskByRoomId(desk);
		createdDeskId = createdDesk.id;
		const booking = {
			createdAt: '2022-06-26T14:52:09.509Z',
			startsAt: '2022-05-26T14:52:09.509Z',
			endsAt: '2022-05-26T14:52:09.509Z',
			Desk: { connect: { id: createdDeskId } },
			Employee: { connect: { id: 5 } },
		}
		const createdBooking = await service.createBooking(booking);
		createdBookingId = createdBooking.id;
		const createdInvite = await service.createInvite(createdBooking.id, 'user2@gmail.com');
		createdInviteId = createdInvite.id;

		if(tempCreatedBooking != null){
			const res = await service.deleteBooking(tempCreatedBooking)
			tempCreatedBooking = null;
			console.log("DELETED: " + res);
		}
	});

	afterEach(async () => {
		await service.deleteInvite(createdInviteId);
		await service.deleteBooking(createdBookingId);
		await deskService.deleteDeskById(createdDeskId);
		if(tempCreatedBooking != null){
			const res = await service.deleteBooking(tempCreatedBooking)
			tempCreatedBooking = null;
			console.log("DELETED: " + res);
		}
	});

	it('should get all bookings', async () => {
		const bookings = await service.getAllBookings();
		expect(bookings).toBeDefined();
		expect(bookings.length).toBeGreaterThan(0);
	});

	it('should get all the bookings for specified desk', async () => {
		const testVal = await service.getBookingsForDesk(createdDeskId);
		expect(testVal).toHaveLength(1);

	});

	it('should get a booking by id', async () => {
		const result = await service.getBookingById(createdBookingId);
		expect(result.employeeId).toEqual(5);
	});

	it('should create a booking', async () => {
		const bookingNew = {
			createdAt: '2022-06-26T14:52:09.509Z',
			startsAt: '2022-05-26T16:52:09.509Z',
			endsAt: '2022-05-26T16:52:09.509Z',
			Desk: { connect: { id: createdDeskId } },
			Employee: { connect: { id: 5 } },
		}
		const createdBooking = await service.createBooking(bookingNew);
		tempCreatedBooking = createdBooking.id;
		expect(createdBooking).toBeDefined();
		const res = await service.deleteBooking(createdBooking.id);
		if(res != null){
			tempCreatedBooking = null;
		}
	});

	it('should delete a booking', async () => {
		const bookingNew = {
			createdAt: '2022-06-26T14:52:09.509Z',
			startsAt: '2022-05-26T16:52:09.509Z',
			endsAt: '2022-05-26T16:52:09.509Z',
			Desk: { connect: { id: createdDeskId } },
			Employee: { connect: { id: 5 } },
		}
		const createdBooking = await service.createBooking(bookingNew);
		tempCreatedBooking = createdBooking.id;
		expect(createdBooking).toBeDefined();
		const deletedBooking = await service.deleteBooking(createdBooking.id);
		if(deletedBooking != null){
			tempCreatedBooking = null;
		}
		expect(deletedBooking).toBeDefined();
	});

	it('should get bookings by user id', async () => {
		const bookings = await service.getBookingsByUserId(5);
		expect(bookings).toBeDefined();
		expect(bookings.length).toBeGreaterThan(0);
	});

	it('should create an invite', async () => {
		expect(createdInviteId).toBeDefined();
	});

	it('should get invites for booking', async () => {
		const invites = await service.getInvitesForBooking(createdBookingId);
		expect(invites).toBeDefined();
		expect(invites.length).toBeGreaterThan(0);
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

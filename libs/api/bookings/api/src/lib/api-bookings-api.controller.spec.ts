import { Test, TestingModule } from '@nestjs/testing';
import { ApiBookingsRepositoryDataAccessService } from '@office-booker/api/bookings/repository/data-access';
import { ApiCompaniesRepositoryDataAccessService } from '@office-booker/api/companies/repository/data-access';
import { ApiDesksRepositoryDataAccessService } from '@office-booker/api/desks/repository/data-access';
import { ApiPermissionsService } from '@office-booker/api/permissions';
import { ApiRoomsRepositoryDataAccessService } from '@office-booker/api/rooms/repository/data-access';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';
import { ApiUsersRepositoryDataAccessService } from '@office-booker/api/users/repository/data-access';
import exp = require('constants');
import { ApiBookingsApiController } from './api-bookings-api.controller';

describe('ApiBookingsApiController Unit Tests', () => {
  let controller: ApiBookingsApiController;
  let service: ApiBookingsRepositoryDataAccessService;
  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: ApiBookingsRepositoryDataAccessService, ApiPermissionsService, ApiDesksRepositoryDataAccessService, ApiRoomsRepositoryDataAccessService, ApiCompaniesRepositoryDataAccessService, ApiUsersRepositoryDataAccessService,
      useFactory: () => ({
        getBookingsForDesk: jest.fn(() => []),
        getBookingById: jest.fn(() => ({})),
        getCurrentBookingsForDesk: jest.fn(() => []),
        deleteBooking: jest.fn(() => ({})),
        createBooking: jest.fn(() => ({})),
      })
    }
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApiBookingsApiController],
      providers: [ApiBookingsRepositoryDataAccessService, ApiServiceProvider, ApiPermissionsService, ApiDesksRepositoryDataAccessService, ApiRoomsRepositoryDataAccessService, ApiCompaniesRepositoryDataAccessService, ApiUsersRepositoryDataAccessService, PrismaService],
    }).compile();
    controller = app.get<ApiBookingsApiController>(ApiBookingsApiController);
    service = app.get<ApiBookingsRepositoryDataAccessService>(ApiBookingsRepositoryDataAccessService);
  });

  it("calling getBookingsForDesk method", () => {
    const deskId = "1";
    controller.getBookingsForDesk(deskId);
    expect(service.getBookingsForDesk).toHaveBeenCalledWith(Number(deskId));
  })

  it("calling getBookingById method", () => {
    const bookingId = "1";
    controller.getBookingById(bookingId);
    expect(service.getBookingById).toHaveBeenCalledWith(Number(bookingId));
  })

  it("calling getCurrentBookingsForDesk method", () => {
    const deskId = "1";
    controller.getCurrentBookingsForDesk(deskId);
    expect(service.getCurrentBookingsForDesk).toHaveBeenCalledWith(Number(deskId));
  })

  it("calling deleteBooking method", () => {
    const bookingId = "1";
    controller.deleteBooking(bookingId);
    expect(service.deleteBooking).toHaveBeenCalledWith(Number(bookingId));
  })

  it("calling createBooking method", () => {
    const deskId = "1";
    const userId = "2";
    const postData = {
      startsAt: new Date(),
      endsAt: new Date(),
      deskId: Number(deskId),
      userId: Number(userId),
    }
    controller.createBooking(postData);
    expect(service.createBooking).toHaveBeenCalledWith({
      Desk: {
        connect: { id: Number(deskId) },
      },
      Employee: {
        connect: { id: Number(userId) },
      },
      endsAt: postData.endsAt,
      startsAt: postData.startsAt,
    });
  })
});

describe('ApiBookingsApiController Integration Tests', () => {
  let controller: ApiBookingsApiController;
  let service: ApiBookingsRepositoryDataAccessService;
  let bookingId: number;
  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApiBookingsApiController],
      providers: [ApiBookingsRepositoryDataAccessService, ApiPermissionsService, ApiDesksRepositoryDataAccessService, ApiRoomsRepositoryDataAccessService, ApiCompaniesRepositoryDataAccessService, ApiUsersRepositoryDataAccessService, PrismaService],
    }).compile();
    controller = app.get<ApiBookingsApiController>(ApiBookingsApiController);
    service = app.get<ApiBookingsRepositoryDataAccessService>(ApiBookingsRepositoryDataAccessService);
  });
  it("testing createBooking method", async () => {
    const postData = {
      startsAt: new Date('2022-09-23T11:08:04.952Z'),
      endsAt: new Date('2022-09-23T11:08:04.952Z'),
      deskId: Number('28'),
      userId: Number('5'),
    }
    const res = await controller.createBooking(postData);
    expect(res.startsAt).toEqual(postData.startsAt);
    expect(res.endsAt).toEqual(postData.endsAt);
    expect(res.deskId).toEqual(postData.deskId);
    expect(res.employeeId).toEqual(postData.userId);
    bookingId = res.id;
  })
  it("testing getBookingsForDesk method", async () => {
    const res = await controller.getBookingsForDesk('28');
    expect(res[0].deskId).toEqual(28);
    expect(res[0].startsAt).toEqual(new Date('2022-09-23T11:08:04.952Z'));
    expect(res[0].endsAt).toEqual(new Date('2022-09-23T11:08:04.952Z'));
    expect(res[0].employeeId).toEqual(5);
  })
  it("testing deleteBooking method", async () => {
    await controller.deleteBooking(bookingId + "");
    const res = await controller.getBookingById(bookingId.toString());
    expect(res).toEqual(null);
  })
});

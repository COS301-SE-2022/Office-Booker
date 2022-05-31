import { Test, TestingModule } from '@nestjs/testing';
import { ApiBookingsRepositoryDataAccessService } from '@office-booker/api/bookings/repository/data-access';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';
import { ApiBookingsApiController } from './api-bookings-api.controller';

describe('ApiBookingsApiController', () => {
  let controller: ApiBookingsApiController;
  let service: ApiBookingsRepositoryDataAccessService;
  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: ApiBookingsRepositoryDataAccessService,
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
      providers: [ApiBookingsRepositoryDataAccessService, ApiServiceProvider],
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
    }
    controller.createBooking(deskId, userId, postData);
    expect(service.createBooking).toHaveBeenCalledWith({
      startsAt: postData.startsAt,
      endsAt: postData.endsAt,
      Desk: {
        connect: { id: Number(deskId) },
      }
    });

  })
});

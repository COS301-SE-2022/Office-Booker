import { Test } from '@nestjs/testing';
import { ApiBookingsRepositoryDataAccessService } from './api-bookings-repository-data-access.service';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';
import { createBooking } from '../functions';
import { prismaMock } from './../singleton'

describe('ApiBookingsRepositoryDataAccessService', () => {
  let service: ApiBookingsRepositoryDataAccessService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiBookingsRepositoryDataAccessService, PrismaService],
    }).compile();

    service = module.get(ApiBookingsRepositoryDataAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});

test('should create new booking ', async () => {
  const desk = {
    id: 2,
    facilities: null,
    Room: null,
    roomId: 3,
    Bookings: null,
    LocationRow: 1,
    LocationCol: 1
  }

  const date: Date = new Date(); 

  const booking = {
    id: 1,
    Desk: null,//cant create type Desk, keeps throwing circular dependency errors
    deskId: 2,
    createdAt: date,
    startsAt: date,
    endsAt: date
  }

  prismaMock.booking.create.mockResolvedValue(booking)

  await expect(createBooking(booking)).resolves.toEqual({
    id: 1,
    Desk: null,//cant create type Desk, keeps throwing circular dependency errors
    deskId: 2,
    createdAt: date,
    startsAt: date,
    endsAt: date
  })
})

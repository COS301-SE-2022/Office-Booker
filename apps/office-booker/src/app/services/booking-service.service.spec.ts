import { TestBed } from '@angular/core/testing';

import { BookingServiceService } from './booking-service.service';

describe('BookingServiceService', () => {
  let service: BookingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

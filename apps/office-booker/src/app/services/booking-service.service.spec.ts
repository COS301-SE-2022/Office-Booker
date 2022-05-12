import { TestBed } from '@angular/core/testing';

import { BookingServiceService } from './booking-service.service';
import { HttpClientModule } from '@angular/common/http';
describe('BookingServiceService', () => {
  let service: BookingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], 
      providers: [BookingServiceService]
    });
    service = TestBed.inject(BookingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

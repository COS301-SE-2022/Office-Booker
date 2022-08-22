import { TestBed } from '@angular/core/testing';

import { FacilitiesServiceService } from './facilities-service.service';

describe('FacilitiesServiceService', () => {
  let service: FacilitiesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacilitiesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

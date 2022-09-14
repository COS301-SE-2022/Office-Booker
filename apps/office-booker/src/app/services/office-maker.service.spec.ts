import { TestBed } from '@angular/core/testing';

import { OfficeMakerService } from './office-maker.service';
import { HttpClientModule } from '@angular/common/http';

describe('OfficeMakerService', () => {
  let service: OfficeMakerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], 
      providers: [OfficeMakerService]
    });
    service = TestBed.inject(OfficeMakerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { SvgService } from './svg.service';

describe('SvgService', () => {
  let service: SvgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SvgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

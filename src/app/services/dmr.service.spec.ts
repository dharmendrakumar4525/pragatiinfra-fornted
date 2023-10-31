import { TestBed } from '@angular/core/testing';

import { DmrService } from './dmr.service';

describe('DmrService', () => {
  let service: DmrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DmrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

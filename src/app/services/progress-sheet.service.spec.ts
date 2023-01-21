import { TestBed } from '@angular/core/testing';

import { ProgressSheetService } from './progress-sheet.service';

describe('ProgressSheetService', () => {
  let service: ProgressSheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressSheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

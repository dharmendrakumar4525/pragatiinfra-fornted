import { TestBed } from '@angular/core/testing';

import { StorageCookieService } from '@services/cookie/storage-cookie.service';

describe('StorageCookieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StorageCookieService = TestBed.get(StorageCookieService);
    expect(service).toBeTruthy();
  });
});

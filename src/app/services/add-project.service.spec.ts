import { TestBed } from '@angular/core/testing';

import { AddProjectService } from './add-project.service';

describe('AddProjectService', () => {
  let service: AddProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

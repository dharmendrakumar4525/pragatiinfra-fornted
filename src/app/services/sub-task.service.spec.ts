import { TestBed } from '@angular/core/testing';

import { SubTaskService } from './sub-task.service';

describe('SubTaskService', () => {
  let service: SubTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

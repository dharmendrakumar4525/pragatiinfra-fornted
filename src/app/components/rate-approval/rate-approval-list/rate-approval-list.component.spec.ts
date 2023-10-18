import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateApprovalListComponent } from './rate-approval-list.component';

describe('RateApprovalListComponent', () => {
  let component: RateApprovalListComponent;
  let fixture: ComponentFixture<RateApprovalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateApprovalListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateApprovalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

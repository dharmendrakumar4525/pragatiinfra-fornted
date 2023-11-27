import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateApprovalStatusUpdateComponent } from './rate-approval-status-update.component';

describe('RateApprovalStatusUpdateComponent', () => {
  let component: RateApprovalStatusUpdateComponent;
  let fixture: ComponentFixture<RateApprovalStatusUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateApprovalStatusUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateApprovalStatusUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

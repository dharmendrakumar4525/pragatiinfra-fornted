import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateApprovalUpdateComponent } from './rate-approval-update.component';

describe('RateApprovalUpdateComponent', () => {
  let component: RateApprovalUpdateComponent;
  let fixture: ComponentFixture<RateApprovalUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateApprovalUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateApprovalUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

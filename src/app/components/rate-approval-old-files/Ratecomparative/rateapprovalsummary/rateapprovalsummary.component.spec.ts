import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateapprovalsummaryComponent } from './rateapprovalsummary.component';

describe('RateapprovalsummaryComponent', () => {
  let component: RateapprovalsummaryComponent;
  let fixture: ComponentFixture<RateapprovalsummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateapprovalsummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateapprovalsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

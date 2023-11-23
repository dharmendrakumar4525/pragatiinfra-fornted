import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateComparativeStatusUpdateComponent } from './rate-comparative-status-update.component';

describe('RateComparativeStatusUpdateComponent', () => {
  let component: RateComparativeStatusUpdateComponent;
  let fixture: ComponentFixture<RateComparativeStatusUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateComparativeStatusUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateComparativeStatusUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

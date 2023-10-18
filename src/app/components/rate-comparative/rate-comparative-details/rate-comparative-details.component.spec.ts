import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateComparativeDetailsComponent } from './rate-comparative-details.component';

describe('RateComparativeDetailsComponent', () => {
  let component: RateComparativeDetailsComponent;
  let fixture: ComponentFixture<RateComparativeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateComparativeDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateComparativeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

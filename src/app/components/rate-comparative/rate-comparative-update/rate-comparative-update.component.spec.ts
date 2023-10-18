import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateComparativeUpdateComponent } from './rate-comparative-update.component';

describe('RateComparativeUpdateComponent', () => {
  let component: RateComparativeUpdateComponent;
  let fixture: ComponentFixture<RateComparativeUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateComparativeUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateComparativeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

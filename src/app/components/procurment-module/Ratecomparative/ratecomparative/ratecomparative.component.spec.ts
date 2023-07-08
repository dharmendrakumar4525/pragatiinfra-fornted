import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatecomparativeComponent } from './ratecomparative.component';

describe('RatecomparativeComponent', () => {
  let component: RatecomparativeComponent;
  let fixture: ComponentFixture<RatecomparativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatecomparativeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatecomparativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

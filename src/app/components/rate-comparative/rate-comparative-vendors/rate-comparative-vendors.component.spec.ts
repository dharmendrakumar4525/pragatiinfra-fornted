import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateComparativeVendorsComponent } from './rate-comparative-vendors.component';

describe('RateComparativeVendorsComponent', () => {
  let component: RateComparativeVendorsComponent;
  let fixture: ComponentFixture<RateComparativeVendorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateComparativeVendorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateComparativeVendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

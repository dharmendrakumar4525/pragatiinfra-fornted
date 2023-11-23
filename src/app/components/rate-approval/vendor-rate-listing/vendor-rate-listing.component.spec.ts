import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorRateListingComponent } from './vendor-rate-listing.component';

describe('VendorRateListingComponent', () => {
  let component: VendorRateListingComponent;
  let fixture: ComponentFixture<VendorRateListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorRateListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorRateListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

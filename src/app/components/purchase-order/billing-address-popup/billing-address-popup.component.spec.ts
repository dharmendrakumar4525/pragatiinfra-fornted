import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingAddressPopupComponent } from './billing-address-popup.component';

describe('BillingAddressPopupComponent', () => {
  let component: BillingAddressPopupComponent;
  let fixture: ComponentFixture<BillingAddressPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingAddressPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingAddressPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

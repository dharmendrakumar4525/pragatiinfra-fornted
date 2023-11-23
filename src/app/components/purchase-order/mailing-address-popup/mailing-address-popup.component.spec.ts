import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailingAddressPopupComponent } from './mailing-address-popup.component';

describe('MailingAddressPopupComponent', () => {
  let component: MailingAddressPopupComponent;
  let fixture: ComponentFixture<MailingAddressPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailingAddressPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailingAddressPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

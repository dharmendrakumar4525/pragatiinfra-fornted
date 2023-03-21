import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApoVendorpostatusComponent } from './apo-vendorpostatus.component';

describe('ApoVendorpostatusComponent', () => {
  let component: ApoVendorpostatusComponent;
  let fixture: ComponentFixture<ApoVendorpostatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApoVendorpostatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApoVendorpostatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

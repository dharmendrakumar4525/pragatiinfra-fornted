import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedpurchaserequestComponent } from './rejectedpurchaserequest.component';

describe('RejectedpurchaserequestComponent', () => {
  let component: RejectedpurchaserequestComponent;
  let fixture: ComponentFixture<RejectedpurchaserequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedpurchaserequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectedpurchaserequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

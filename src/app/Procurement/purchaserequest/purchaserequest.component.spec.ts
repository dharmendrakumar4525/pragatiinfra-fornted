import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaserequestComponent } from './purchaserequest.component';

describe('PurchaserequestComponent', () => {
  let component: PurchaserequestComponent;
  let fixture: ComponentFixture<PurchaserequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaserequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaserequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

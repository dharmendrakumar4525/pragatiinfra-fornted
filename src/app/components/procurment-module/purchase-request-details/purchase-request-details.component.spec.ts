import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseRequestDetailsComponent } from './purchase-request-details.component';

describe('PurchaseRequestDetailsComponent', () => {
  let component: PurchaseRequestDetailsComponent;
  let fixture: ComponentFixture<PurchaseRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseRequestDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

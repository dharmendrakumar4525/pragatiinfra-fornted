import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderApprovalComponent } from './purchase-order-approval.component';

describe('PurchaseOrderUpdateComponent', () => {
  let component: PurchaseOrderApprovalComponent;
  let fixture: ComponentFixture<PurchaseOrderApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseOrderApprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseOrderApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

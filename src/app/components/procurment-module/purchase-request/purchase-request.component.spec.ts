import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseRequestComponent } from './purchase-request.component';

describe('PurchaseRequestComponent', () => {
  let component: PurchaseRequestComponent;
  let fixture: ComponentFixture<PurchaseRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

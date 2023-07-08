import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisePurchaseRequestComponent } from './revise-purchase-request.component';

describe('RevisePurchaseRequestComponent', () => {
  let component: RevisePurchaseRequestComponent;
  let fixture: ComponentFixture<RevisePurchaseRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisePurchaseRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisePurchaseRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

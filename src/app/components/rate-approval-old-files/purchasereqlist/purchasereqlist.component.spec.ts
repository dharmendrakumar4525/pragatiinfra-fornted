import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasereqlistComponent } from './purchasereqlist.component';

describe('PurchasereqlistComponent', () => {
  let component: PurchasereqlistComponent;
  let fixture: ComponentFixture<PurchasereqlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasereqlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasereqlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

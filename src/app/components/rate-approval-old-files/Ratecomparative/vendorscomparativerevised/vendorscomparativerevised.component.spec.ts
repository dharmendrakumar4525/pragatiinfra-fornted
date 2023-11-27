import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorscomparativerevisedComponent } from './vendorscomparativerevised.component';

describe('VendorscomparativerevisedComponent', () => {
  let component: VendorscomparativerevisedComponent;
  let fixture: ComponentFixture<VendorscomparativerevisedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorscomparativerevisedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorscomparativerevisedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

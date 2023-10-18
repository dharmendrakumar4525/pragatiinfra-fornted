import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorscomparativeapprovedComponent } from './vendorscomparativeapproved.component';

describe('VendorscomparativeapprovedComponent', () => {
  let component: VendorscomparativeapprovedComponent;
  let fixture: ComponentFixture<VendorscomparativeapprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorscomparativeapprovedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorscomparativeapprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

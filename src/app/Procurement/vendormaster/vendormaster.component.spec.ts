import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendormasterComponent } from './vendormaster.component';

describe('VendormasterComponent', () => {
  let component: VendormasterComponent;
  let fixture: ComponentFixture<VendormasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendormasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendormasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

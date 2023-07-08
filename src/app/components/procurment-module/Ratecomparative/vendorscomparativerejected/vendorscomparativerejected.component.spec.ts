import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorscomparativerejectedComponent } from './vendorscomparativerejected.component';

describe('VendorscomparativerejectedComponent', () => {
  let component: VendorscomparativerejectedComponent;
  let fixture: ComponentFixture<VendorscomparativerejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorscomparativerejectedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorscomparativerejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandMasterComponent } from './brand-master.component';

describe('BrandMasterComponent', () => {
  let component: BrandMasterComponent;
  let fixture: ComponentFixture<BrandMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

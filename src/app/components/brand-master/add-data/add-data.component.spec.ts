import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandAddDataComponent } from './add-data.component';

describe('AddDataComponent', () => {
  let component: BrandAddDataComponent;
  let fixture: ComponentFixture<BrandAddDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandAddDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandAddDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

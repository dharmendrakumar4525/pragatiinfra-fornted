import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRemarksComponent } from './add-remarks.component';

describe('AddRemarksComponent', () => {
  let component: AddRemarksComponent;
  let fixture: ComponentFixture<AddRemarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRemarksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

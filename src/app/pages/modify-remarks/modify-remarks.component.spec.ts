import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyRemarksComponent } from './modify-remarks.component';

describe('ModifyRemarksComponent', () => {
  let component: ModifyRemarksComponent;
  let fixture: ComponentFixture<ModifyRemarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyRemarksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyRemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

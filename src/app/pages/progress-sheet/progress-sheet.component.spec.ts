import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressSheetComponent } from './progress-sheet.component';

describe('ProgressSheetComponent', () => {
  let component: ProgressSheetComponent;
  let fixture: ComponentFixture<ProgressSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

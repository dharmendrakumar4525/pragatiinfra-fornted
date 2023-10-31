import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialRecordSheetComponent } from './material-record-sheet.component';

describe('MaterialRecordSheetComponent', () => {
  let component: MaterialRecordSheetComponent;
  let fixture: ComponentFixture<MaterialRecordSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialRecordSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialRecordSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubActivityComponent } from './edit-sub-activity.component';

describe('EditSubActivityComponent', () => {
  let component: EditSubActivityComponent;
  let fixture: ComponentFixture<EditSubActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSubActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSubActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

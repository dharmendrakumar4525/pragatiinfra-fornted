import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubActivitiesComponent } from './edit-sub-activities.component';

describe('EditSubActivitiesComponent', () => {
  let component: EditSubActivitiesComponent;
  let fixture: ComponentFixture<EditSubActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSubActivitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSubActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

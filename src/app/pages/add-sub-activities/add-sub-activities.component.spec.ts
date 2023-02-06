import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubActivitiesComponent } from './add-sub-activities.component';

describe('AddSubActivitiesComponent', () => {
  let component: AddSubActivitiesComponent;
  let fixture: ComponentFixture<AddSubActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubActivitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubActivitiesComponent } from './sub-activities.component';

describe('SubActivitiesComponent', () => {
  let component: SubActivitiesComponent;
  let fixture: ComponentFixture<SubActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubActivitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

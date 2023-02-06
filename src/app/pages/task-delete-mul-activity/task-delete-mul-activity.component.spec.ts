import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDeleteMulActivityComponent } from './task-delete-mul-activity.component';

describe('TaskDeleteMulActivityComponent', () => {
  let component: TaskDeleteMulActivityComponent;
  let fixture: ComponentFixture<TaskDeleteMulActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskDeleteMulActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskDeleteMulActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

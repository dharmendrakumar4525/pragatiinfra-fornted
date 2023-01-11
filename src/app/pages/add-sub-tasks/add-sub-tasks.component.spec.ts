import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubTasksComponent } from './add-sub-tasks.component';

describe('AddSubTasksComponent', () => {
  let component: AddSubTasksComponent;
  let fixture: ComponentFixture<AddSubTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubTasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

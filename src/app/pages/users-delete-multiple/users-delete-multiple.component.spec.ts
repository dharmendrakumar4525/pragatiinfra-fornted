import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDeleteMultipleComponent } from './users-delete-multiple.component';

describe('UsersDeleteMultipleComponent', () => {
  let component: UsersDeleteMultipleComponent;
  let fixture: ComponentFixture<UsersDeleteMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersDeleteMultipleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersDeleteMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

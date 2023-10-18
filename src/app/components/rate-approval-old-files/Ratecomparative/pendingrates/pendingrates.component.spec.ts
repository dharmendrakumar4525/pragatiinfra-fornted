import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingratesComponent } from './pendingrates.component';

describe('PendingratesComponent', () => {
  let component: PendingratesComponent;
  let fixture: ComponentFixture<PendingratesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingratesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingratesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

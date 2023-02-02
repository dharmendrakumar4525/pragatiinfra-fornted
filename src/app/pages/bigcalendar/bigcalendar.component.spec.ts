import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigcalendarComponent } from './bigcalendar.component';

describe('BigcalendarComponent', () => {
  let component: BigcalendarComponent;
  let fixture: ComponentFixture<BigcalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BigcalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BigcalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

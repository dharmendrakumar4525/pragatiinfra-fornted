import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RcomparativeComponent } from './rcomparative.component';

describe('RcomparativeComponent', () => {
  let component: RcomparativeComponent;
  let fixture: ComponentFixture<RcomparativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RcomparativeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RcomparativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

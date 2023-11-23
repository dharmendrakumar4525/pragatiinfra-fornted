import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedsummaryComponent } from './rejectedsummary.component';

describe('RejectedsummaryComponent', () => {
  let component: RejectedsummaryComponent;
  let fixture: ComponentFixture<RejectedsummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedsummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectedsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

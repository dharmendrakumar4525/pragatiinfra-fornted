import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedratessummaryComponent } from './rejectedratessummary.component';

describe('RejectedratessummaryComponent', () => {
  let component: RejectedratessummaryComponent;
  let fixture: ComponentFixture<RejectedratessummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedratessummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectedratessummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

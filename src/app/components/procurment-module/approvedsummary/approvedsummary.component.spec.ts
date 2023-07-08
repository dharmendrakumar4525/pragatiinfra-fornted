import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedsummaryComponent } from './approvedsummary.component';

describe('ApprovedsummaryComponent', () => {
  let component: ApprovedsummaryComponent;
  let fixture: ComponentFixture<ApprovedsummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedsummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

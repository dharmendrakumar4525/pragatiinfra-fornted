import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionapprovalsComponent } from './requisitionapprovals.component';

describe('RequisitionapprovalsComponent', () => {
  let component: RequisitionapprovalsComponent;
  let fixture: ComponentFixture<RequisitionapprovalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequisitionapprovalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequisitionapprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

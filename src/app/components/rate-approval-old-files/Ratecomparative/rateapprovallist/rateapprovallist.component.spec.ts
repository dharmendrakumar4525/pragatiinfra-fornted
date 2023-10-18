import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateapprovallistComponent } from './rateapprovallist.component';

describe('RateapprovallistComponent', () => {
  let component: RateapprovallistComponent;
  let fixture: ComponentFixture<RateapprovallistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateapprovallistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateapprovallistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

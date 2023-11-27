import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedpoComponent } from './approvedpo.component';

describe('ApprovedpoComponent', () => {
  let component: ApprovedpoComponent;
  let fixture: ComponentFixture<ApprovedpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedpoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

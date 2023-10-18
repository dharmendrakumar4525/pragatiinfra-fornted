import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedmaterialrequestComponent } from './approvedmaterialrequest.component';

describe('ApprovedmaterialrequestComponent', () => {
  let component: ApprovedmaterialrequestComponent;
  let fixture: ComponentFixture<ApprovedmaterialrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedmaterialrequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedmaterialrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

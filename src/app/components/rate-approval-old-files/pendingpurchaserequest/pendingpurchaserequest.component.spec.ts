import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingpurchaserequestComponent } from './pendingpurchaserequest.component';

describe('PendingpurchaserequestComponent', () => {
  let component: PendingpurchaserequestComponent;
  let fixture: ComponentFixture<PendingpurchaserequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingpurchaserequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingpurchaserequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

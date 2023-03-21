import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingpoComponent } from './pendingpo.component';

describe('PendingpoComponent', () => {
  let component: PendingpoComponent;
  let fixture: ComponentFixture<PendingpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingpoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

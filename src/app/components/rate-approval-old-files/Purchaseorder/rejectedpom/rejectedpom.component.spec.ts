import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedpomComponent } from './rejectedpom.component';

describe('RejectedpomComponent', () => {
  let component: RejectedpomComponent;
  let fixture: ComponentFixture<RejectedpomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedpomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectedpomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

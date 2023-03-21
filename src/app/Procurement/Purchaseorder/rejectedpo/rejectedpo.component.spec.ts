import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedpoComponent } from './rejectedpo.component';

describe('RejectedpoComponent', () => {
  let component: RejectedpoComponent;
  let fixture: ComponentFixture<RejectedpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedpoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectedpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisedrateapprovallistComponent } from './revisedrateapprovallist.component';

describe('RevisedrateapprovallistComponent', () => {
  let component: RevisedrateapprovallistComponent;
  let fixture: ComponentFixture<RevisedrateapprovallistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisedrateapprovallistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisedrateapprovallistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PomapproverComponent } from './pomapprover.component';

describe('PomapproverComponent', () => {
  let component: PomapproverComponent;
  let fixture: ComponentFixture<PomapproverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PomapproverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PomapproverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

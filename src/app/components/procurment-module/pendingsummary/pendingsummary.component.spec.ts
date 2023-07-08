import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingsummaryComponent } from './pendingsummary.component';

describe('PendingsummaryComponent', () => {
  let component: PendingsummaryComponent;
  let fixture: ComponentFixture<PendingsummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingsummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

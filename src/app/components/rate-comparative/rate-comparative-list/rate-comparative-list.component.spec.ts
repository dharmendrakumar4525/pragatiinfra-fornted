import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateComparativeListComponent } from './rate-comparative-list.component';

describe('RateComparativeListComponent', () => {
  let component: RateComparativeListComponent;
  let fixture: ComponentFixture<RateComparativeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateComparativeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateComparativeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

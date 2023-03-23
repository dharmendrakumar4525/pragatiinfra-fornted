import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrstatusComponent } from './prstatus.component';

describe('PrstatusComponent', () => {
  let component: PrstatusComponent;
  let fixture: ComponentFixture<PrstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrstatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

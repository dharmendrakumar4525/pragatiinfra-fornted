import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalDmrComponent } from './final-dmr.component';

describe('FinalDmrComponent', () => {
  let component: FinalDmrComponent;
  let fixture: ComponentFixture<FinalDmrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalDmrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalDmrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

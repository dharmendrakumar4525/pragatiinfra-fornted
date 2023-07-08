import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PomcreatorEsignComponent } from './pomcreator-esign.component';

describe('PomcreatorEsignComponent', () => {
  let component: PomcreatorEsignComponent;
  let fixture: ComponentFixture<PomcreatorEsignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PomcreatorEsignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PomcreatorEsignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

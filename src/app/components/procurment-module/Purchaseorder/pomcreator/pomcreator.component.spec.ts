import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PomcreatorComponent } from './pomcreator.component';

describe('PomcreatorComponent', () => {
  let component: PomcreatorComponent;
  let fixture: ComponentFixture<PomcreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PomcreatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PomcreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

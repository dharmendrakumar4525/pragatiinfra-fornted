import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectComponent } from './view-project.component';

describe('ViewProjectComponent', () => {
  let component: ViewProjectComponent;
  let fixture: ComponentFixture<ViewProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

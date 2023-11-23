import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DMRFormComponent } from './dmr-form.component';

describe('DMRFormComponent', () => {
  let component: DMRFormComponent;
  let fixture: ComponentFixture<DMRFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DMRFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DMRFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

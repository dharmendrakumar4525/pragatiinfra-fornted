import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesDeleteMultipleComponent } from './roles-delete-multiple.component';

describe('RolesDeleteMultipleComponent', () => {
  let component: RolesDeleteMultipleComponent;
  let fixture: ComponentFixture<RolesDeleteMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesDeleteMultipleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesDeleteMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

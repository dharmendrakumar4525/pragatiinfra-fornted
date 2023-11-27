import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgmasterComponent } from './orgmaster.component';

describe('OrgmasterComponent', () => {
  let component: OrgmasterComponent;
  let fixture: ComponentFixture<OrgmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgmasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

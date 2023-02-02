import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCreateuserComponent } from './master-createuser.component';

describe('MasterCreateuserComponent', () => {
  let component: MasterCreateuserComponent;
  let fixture: ComponentFixture<MasterCreateuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterCreateuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterCreateuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

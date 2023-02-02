import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasteruserComponent } from './masteruser.component';

describe('MasteruserComponent', () => {
  let component: MasteruserComponent;
  let fixture: ComponentFixture<MasteruserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasteruserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasteruserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotokenComponent } from './potoken.component';

describe('PotokenComponent', () => {
  let component: PotokenComponent;
  let fixture: ComponentFixture<PotokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PotokenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

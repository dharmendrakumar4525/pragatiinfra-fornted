import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePrStatusComponent } from './update-pr-status.component';

describe('UpdatePrStatusComponent', () => {
  let component: UpdatePrStatusComponent;
  let fixture: ComponentFixture<UpdatePrStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePrStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePrStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

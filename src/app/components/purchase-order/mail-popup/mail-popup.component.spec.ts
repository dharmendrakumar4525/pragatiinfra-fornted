import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailPopupComponent } from './mail-popup.component';

describe('MailPopupComponent', () => {
  let component: MailPopupComponent;
  let fixture: ComponentFixture<MailPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

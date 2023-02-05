import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerAddMemberComponent } from './inner-add-member.component';

describe('InnerAddMemberComponent', () => {
  let component: InnerAddMemberComponent;
  let fixture: ComponentFixture<InnerAddMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnerAddMemberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InnerAddMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

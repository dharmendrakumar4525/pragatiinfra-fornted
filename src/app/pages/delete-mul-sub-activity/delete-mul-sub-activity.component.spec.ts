import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMulSubActivityComponent } from './delete-mul-sub-activity.component';

describe('DeleteMulSubActivityComponent', () => {
  let component: DeleteMulSubActivityComponent;
  let fixture: ComponentFixture<DeleteMulSubActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMulSubActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteMulSubActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

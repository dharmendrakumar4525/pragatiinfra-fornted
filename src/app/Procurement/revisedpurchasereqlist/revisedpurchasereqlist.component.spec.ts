import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisedpurchasereqlistComponent } from './revisedpurchasereqlist.component';

describe('RevisedpurchasereqlistComponent', () => {
  let component: RevisedpurchasereqlistComponent;
  let fixture: ComponentFixture<RevisedpurchasereqlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisedpurchasereqlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisedpurchasereqlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

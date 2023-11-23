import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTablePopupComponent } from './item-table-popup.component';

describe('ItemTablePopupComponent', () => {
  let component: ItemTablePopupComponent;
  let fixture: ComponentFixture<ItemTablePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemTablePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemTablePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolistComponent } from './polist.component';

describe('PolistComponent', () => {
  let component: PolistComponent;
  let fixture: ComponentFixture<PolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

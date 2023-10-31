import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOverviewComponent } from './table-overview.component';

describe('TableOverviewComponent', () => {
  let component: TableOverviewComponent;
  let fixture: ComponentFixture<TableOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

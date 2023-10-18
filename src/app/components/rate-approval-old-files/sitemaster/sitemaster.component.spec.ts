import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitemasterComponent } from './sitemaster.component';

describe('SitemasterComponent', () => {
  let component: SitemasterComponent;
  let fixture: ComponentFixture<SitemasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SitemasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SitemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinjamanTolakComponent } from './pinjaman-tolak.component';

describe('PinjamanTolakComponent', () => {
  let component: PinjamanTolakComponent;
  let fixture: ComponentFixture<PinjamanTolakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinjamanTolakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinjamanTolakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

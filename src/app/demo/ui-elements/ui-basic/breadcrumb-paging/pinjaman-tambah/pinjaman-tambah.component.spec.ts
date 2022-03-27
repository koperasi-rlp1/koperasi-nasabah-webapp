import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinjamanTambahComponent } from './pinjaman-tambah.component';

describe('PinjamanTambahComponent', () => {
  let component: PinjamanTambahComponent;
  let fixture: ComponentFixture<PinjamanTambahComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinjamanTambahComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinjamanTambahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

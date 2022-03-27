import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinjamanMenungguKonfirmasiComponent } from './pinjaman-menunggu-konfirmasi.component';

describe('PinjamanMenungguKonfirmasiComponent', () => {
  let component: PinjamanMenungguKonfirmasiComponent;
  let fixture: ComponentFixture<PinjamanMenungguKonfirmasiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinjamanMenungguKonfirmasiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinjamanMenungguKonfirmasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

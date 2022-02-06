import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpananWajibKonfirmasiComponent } from './simpanan-wajib-konfirmasi.component';

describe('SimpananWajibKonfirmasiComponent', () => {
  let component: SimpananWajibKonfirmasiComponent;
  let fixture: ComponentFixture<SimpananWajibKonfirmasiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpananWajibKonfirmasiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpananWajibKonfirmasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

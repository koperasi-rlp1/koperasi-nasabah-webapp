import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpananWajibTambahComponent } from './simpanan-wajib-tambah.component';

describe('SimpananWajibTambahComponent', () => {
  let component: SimpananWajibTambahComponent;
  let fixture: ComponentFixture<SimpananWajibTambahComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpananWajibTambahComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpananWajibTambahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

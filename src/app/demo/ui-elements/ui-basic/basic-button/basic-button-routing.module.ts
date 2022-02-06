import { SimpananWajibTambahComponent } from './simpanan-wajib-tambah/simpanan-wajib-tambah.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BasicButtonComponent} from './basic-button.component';
import {SimpananWajibKonfirmasiComponent} from './simpanan-wajib-konfirmasi/simpanan-wajib-konfirmasi.component';

const routes: Routes = [
  {
    path: '',
    component: BasicButtonComponent
  },
  {
    path: 'menunggu-konfirmasi',
    component: SimpananWajibKonfirmasiComponent
  },
  {
    path: 'tambah',
    component: SimpananWajibTambahComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicButtonRoutingModule { }

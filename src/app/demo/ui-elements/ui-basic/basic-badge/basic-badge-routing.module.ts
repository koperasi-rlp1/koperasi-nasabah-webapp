import { SimpananSukarelaTambahComponent } from './simpanan-sukarela-tambah/simpanan-sukarela-tambah.component';
import { SimpananSukarelaKonfirmasiComponent } from './simpanan-sukarela-konfirmasi/simpanan-sukarela-konfirmasi.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BasicBadgeComponent} from './basic-badge.component';

const routes: Routes = [
  {
    path: '',
    component: BasicBadgeComponent
  },
  {
    path: 'menunggu-konfirmasi',
    component : SimpananSukarelaKonfirmasiComponent
  },
  {
    path : 'tambah',
    component : SimpananSukarelaTambahComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicBadgeRoutingModule { }

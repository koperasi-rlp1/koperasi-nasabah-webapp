import { PinjamanTolakComponent } from './pinjaman-tolak/pinjaman-tolak.component';
import { PinjamanMenungguKonfirmasiComponent } from './pinjaman-menunggu-konfirmasi/pinjaman-menunggu-konfirmasi.component';
import { PinjamanTambahComponent } from './pinjaman-tambah/pinjaman-tambah.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BreadcrumbPagingComponent} from './breadcrumb-paging.component';

const routes: Routes = [
  {
    path: '',
    component: BreadcrumbPagingComponent
  },
  {
    path: 'tambah',
    component: PinjamanTambahComponent
  },
  {
    path: 'menunggu-konfirmasi',
    component: PinjamanMenungguKonfirmasiComponent
  },
  {
    path: 'tolak',
    component: PinjamanTolakComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BreadcrumbPagingRoutingModule { }

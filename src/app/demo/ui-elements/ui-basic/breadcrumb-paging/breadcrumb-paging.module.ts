import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbPagingRoutingModule } from './breadcrumb-paging-routing.module';
import { BreadcrumbPagingComponent } from './breadcrumb-paging.component';
import {SharedModule} from '../../../../theme/shared/shared.module';
import {NgbButtonsModule, NgbDropdownModule, NgbPaginationModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import { PinjamanMenungguKonfirmasiComponent } from './pinjaman-menunggu-konfirmasi/pinjaman-menunggu-konfirmasi.component';
import { PinjamanTambahComponent } from './pinjaman-tambah/pinjaman-tambah.component';
import { PinjamanTolakComponent } from './pinjaman-tolak/pinjaman-tolak.component';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { NgxCurrencyModule } from 'ngx-currency';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BreadcrumbPagingRoutingModule,
    SharedModule,
    NgbButtonsModule,
    NgbPaginationModule,
    HttpClientModule,
    DataTablesModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgxCurrencyModule,
    ReactiveFormsModule,
  ],
  declarations: [BreadcrumbPagingComponent, PinjamanMenungguKonfirmasiComponent, PinjamanTambahComponent, PinjamanTolakComponent]
})
export class BreadcrumbPagingModule { }

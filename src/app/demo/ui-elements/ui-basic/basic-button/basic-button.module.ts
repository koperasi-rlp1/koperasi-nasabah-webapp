import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicButtonRoutingModule } from './basic-button-routing.module';
import { BasicButtonComponent } from './basic-button.component';
import {SharedModule} from '../../../../theme/shared/shared.module';
import {NgbButtonsModule, NgbDropdownModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { SimpananWajibKonfirmasiComponent } from './simpanan-wajib-konfirmasi/simpanan-wajib-konfirmasi.component';
import { SimpananWajibTambahComponent } from './simpanan-wajib-tambah/simpanan-wajib-tambah.component';

@NgModule({
  imports: [
    CommonModule,
    BasicButtonRoutingModule,
    SharedModule,
    NgbDropdownModule,
    NgbButtonsModule,
    NgbTooltipModule,
    HttpClientModule,
    DataTablesModule
  ],
  declarations: [BasicButtonComponent, SimpananWajibKonfirmasiComponent, SimpananWajibTambahComponent]
})
export class BasicButtonModule { }

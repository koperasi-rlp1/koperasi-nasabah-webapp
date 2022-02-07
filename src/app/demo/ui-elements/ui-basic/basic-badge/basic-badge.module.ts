import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { BasicBadgeRoutingModule } from './basic-badge-routing.module';
import { BasicBadgeComponent } from './basic-badge.component';
import {SharedModule} from '../../../../theme/shared/shared.module';
import {NgbButtonsModule, NgbDropdownModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { SimpananSukarelaKonfirmasiComponent } from './simpanan-sukarela-konfirmasi/simpanan-sukarela-konfirmasi.component';
import { SimpananSukarelaTambahComponent } from './simpanan-sukarela-tambah/simpanan-sukarela-tambah.component';
import {NgxCurrencyModule} from 'ngx-currency';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BasicBadgeRoutingModule,
    SharedModule,
    HttpClientModule,
    DataTablesModule,
    NgbDropdownModule,
    NgbButtonsModule,
    NgbTooltipModule,
    NgxCurrencyModule,
    ReactiveFormsModule,
  ],
  declarations: [BasicBadgeComponent, SimpananSukarelaKonfirmasiComponent, SimpananSukarelaTambahComponent]
})
export class BasicBadgeModule { }

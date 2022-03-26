import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormElementsRoutingModule } from './form-elements-routing.module';
import {SharedModule} from '../../../theme/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { NgbButtonsModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxCurrencyModule } from 'ngx-currency';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormElementsRoutingModule,
    SharedModule,
    DataTablesModule,
    NgbDropdownModule,
    NgbButtonsModule,
    NgbTooltipModule,
    NgxCurrencyModule,
    ReactiveFormsModule
  ],
  declarations: []
})
export class FormElementsModule { }

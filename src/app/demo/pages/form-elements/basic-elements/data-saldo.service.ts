import { DataSaldoNasabah } from './../../../model/transaksi';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataSaldoService {

  constructor(
    private http : HttpClient
  ) { }

  public getDataSaldo(nip : any){
    return this.http.get<DataSaldoNasabah>(`${environment.urlApi}/transaksi/data-saldo/${nip}`, {observe : 'response'});
  }
}

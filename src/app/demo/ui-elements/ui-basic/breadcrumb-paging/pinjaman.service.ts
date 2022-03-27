import { Nasabah } from './../../../pages/authentication/auth-signin/service/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PinjamanService {

  constructor(
    private http : HttpClient
  ) { }

  public cekAkunPinjam(dataNasabah : Nasabah){
    return this.http.post<string>(`${environment.urlApi}/nasabah-procedure/checkSyaratPinjam`, dataNasabah, {observe : 'response'});
  }
}

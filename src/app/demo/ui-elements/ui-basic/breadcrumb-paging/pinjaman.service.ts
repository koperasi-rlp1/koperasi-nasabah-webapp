import { SavePinjaman } from './../../../model/pinjaman';
import { Nasabah } from './../../../pages/authentication/auth-signin/service/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { DatatablesResponse } from 'src/app/demo/model/DatatablesResponse';
import { DatatablesRequest } from 'src/app/demo/model/DatatablesRequest';
import { map } from 'rxjs/operators';

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

  public save(value : SavePinjaman){
    return this.http.post<any>(`${environment.urlApi}/pinjaman/save-approval`, value, {observe : 'response'});
  }

  public datatables(params : any) : Observable<DatatablesResponse>{
    const param = new DatatablesRequest();
    param.draw = params.draw;
    param.length = params.length;
    param.start = params.start;
    param.sortCol = params.order[0].column;
    param.sortDir = params.order[0].dir;
    param.extraParam =  params.extraParam;
    return this.http.post(environment.urlApi +'/pinjaman/datatables', param)
    .pipe(map(data => data as DatatablesResponse));
  }

  public datatablesApproval(params : any) : Observable<DatatablesResponse>{
    const param = new DatatablesRequest();
    param.draw = params.draw;
    param.length = params.length;
    param.start = params.start;
    param.sortCol = params.order[0].column;
    param.sortDir = params.order[0].dir;
    param.extraParam =  params.extraParam;
    return this.http.post(environment.urlApi +'/pinjaman/datatables-approval', param)
    .pipe(map(data => data as DatatablesResponse));
  }

  public datatablesTolak(params : any) : Observable<DatatablesResponse>{
    const param = new DatatablesRequest();
    param.draw = params.draw;
    param.length = params.length;
    param.start = params.start;
    param.sortCol = params.order[0].column;
    param.sortDir = params.order[0].dir;
    param.extraParam =  params.extraParam;
    return this.http.post(environment.urlApi +'/pinjaman/datatables-tolak', param)
    .pipe(map(data => data as DatatablesResponse));
  }
}

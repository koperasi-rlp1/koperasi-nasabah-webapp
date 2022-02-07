import { DatatablesRequest } from './../../../model/DatatablesRequest';
import { DatatablesResponse } from './../../../model/DatatablesResponse';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SimpananSukaRelaService {

  constructor(
    private _http : HttpClient
  ) { }

  public datatables(params : any) : Observable<DatatablesResponse>{
    const param = new DatatablesRequest();
    param.draw = params.draw;
    param.length = params.length;
    param.start = params.start;
    param.sortCol = params.order[0].column;
    param.sortDir = params.order[0].dir;
    param.extraParam =  params.extraParam;
    return this._http.post(environment.urlApi +'/simpanan-sukarela/datatables', param)
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
    return this._http.post(environment.urlApi +'/transaksi/datatables-approval', param)
    .pipe(map(data => data as DatatablesResponse));
  }

  public save(value : any){
    return this._http.post<any>(`${environment.urlApi}/transaksi-approval/pengajuanSimpanan`, value, {observe : 'response'});
  }

  public upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', environment.urlApi + '/transaksi-approval/filesupload', formData, {
        reportProgress: true,
        responseType: 'json'
    });

    return this._http.request(req);
}



}

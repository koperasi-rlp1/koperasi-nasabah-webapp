import { DatatablesRequest } from './../../../model/DatatablesRequest';
import { DatatablesResponse } from './../../../model/DatatablesResponse';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SimpananWajibService {

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
    return this._http.post(environment.urlApi +'/simpanan-wajib/datatables', param)
    .pipe(map(data => data as DatatablesResponse));
  }

}

import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Nasabah, NasabahCheck, Status, User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;

  userPassword : Array<any> = [
    "82","75","61","86","84","78","67"
  ];

  isLogin = false;
  private currentLogin = 'access_token';


  constructor(private router : Router, private toastr : ToastrService, private httpKlien: HttpClient) { }

  // login(username : string, password : string){
  //   if(username == "19201180"){
  //     if(this.userPassword.includes(password) == true){
  //       this.loggedIn = true;
  //       if(this.loggedIn){
  //         localStorage.setItem('Y', 'true');
  //         localStorage.setItem('NIS', username+password);
  //         this.router.navigate(["/dashboard/default"]);
  //       } else {
  //         this.toastr.error("Terjadi Kesalahan");
  //       }
  //     } else{
  //       this.toastr.error("password yang dimasukan salah");
  //     }
  //   } else {
  //     this.toastr.error("username yang dimasukan tidak valid");
  //   }
  //   this.loggedIn = (username == "19201180" && this.userPassword.includes(password));

  // }
  public register(value : any){
    return this.httpKlien.post<any>(`${environment.urlApi}/nasabah-procedure/register`, value, {observe : 'response'});
  }

  public upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', environment.urlApi + '/nasabah-procedure/verifikasiPembayaran', formData, {
        reportProgress: true,
        responseType: 'json'
    });

    return this.httpKlien.request(req);
  }

  public update(value: Nasabah){
    return this.httpKlien.put<any>(`${environment.urlApi}/nasabah-procedure/updateFaseRegistrasi`, value, {observe : 'response'});
  }

  public checking(nip : string, username : any){
    let param = new HttpParams();
    param.append("nip", nip);
    param.append("username", username)
    return this.httpKlien.get<any>(`${environment.urlApi}/nasabah-procedure/checking/${nip}/${username}`, {observe : 'response'});
  }

  public getData(username : any, password : any){
    return this.httpKlien.get<any>(`${environment.urlAuth}/user-admin/data/user?password=${password}&username=${username}`, {observe : 'response'});
  }

  public verify(value : any){
    return this.httpKlien.put<any>(`${environment.urlAuth}/regis/verify`, value, {observe : 'response'});
  }

  logout(){
    const token = localStorage.getItem("token").toString();
    this.httpKlien.delete(environment.urlApi + '/auth/logout/' + token).pipe(map(data => data )).subscribe(resp => {
      localStorage.removeItem('token');
      localStorage.removeItem('currentLogin');
      this.router.navigate(["/auth/signin"]);
    });
  }

  jabatan(){
    return this.httpKlien.get<any>(`${environment.urlApi}/jabatan/findAll`, {observe : 'response'});
  }


  isAuthorized(): Observable<NasabahCheck> {
    const token = localStorage.getItem('token');
    if( token != null) {
        return this.httpKlien.post(environment.urlApi + '/auth/checking', token).pipe(map( data => data as NasabahCheck));
    } else {
        this.router.navigate(['/auth/signin']);
    }
  }

  isAuthentic(): boolean{
  const token = localStorage.getItem('token');
  let statusLogin : boolean = false;
  if(token != null ){
    statusLogin = true;
  }
    return statusLogin;
  }


  // isAuthenticated(){
  //   const promise = new Promise(
  //     (resolve, reject) => {
  //       setTimeout(() => {
  //         resolve(localStorage.getItem("Y"));
  //       }, 1000);
  //     }
  //   );
  //   return promise;
  // }


}

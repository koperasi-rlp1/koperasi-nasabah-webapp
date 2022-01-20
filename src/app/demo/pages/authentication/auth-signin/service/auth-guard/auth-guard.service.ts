import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService : AuthService, private router : Router, private toastr : ToastrService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<boolean> | Promise<boolean> | boolean {
      const allowedRoles = next.data.allowedRoles;
      return this.authService.isAuthorized()
      .pipe(map(data => {
          if(data.nip != null){
              const datePipe = new DatePipe('en-US');
              const myFormattedDate = datePipe.transform(data.since, 'd/MM/yyyy');
              let date = new Date().toLocaleDateString()
              const now = datePipe.transform(date, 'd/MM/yyyy');
              const value = JSON.parse(localStorage.getItem("currentLogin"));
              if(myFormattedDate == now){
                if(allowedRoles.some(r => value.idStatusKeanggotaan)){
                  return true;
                } else{
                  this.toastr.error("Access Denied!!!");
                }
              } else {
                localStorage.removeItem('token')
                this.toastr.info("Token Expired", "Relogin required");
                this.router.navigate(['/auth/signin']);
              }
          }else{
            // this.toastr.error("Access Denied!!!");
            console.log("Login App Koperasi")
          }
      }))
  }

}

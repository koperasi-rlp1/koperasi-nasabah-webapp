import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService : AuthService, private router : Router, private toastr : ToastrService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<boolean> | Promise<boolean> | boolean{
    return this.authService.isAuthenticated()
    .then((authenticated : boolean)=> {
      if(authenticated){
        return true;
      } else {
        this.toastr.error("Access Denied");
        this.router.navigate(['/']);
      }
    })
  }
}

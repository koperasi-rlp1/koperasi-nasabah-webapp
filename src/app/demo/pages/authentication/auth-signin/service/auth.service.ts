import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  
  userPassword : Array<any> = [
    "82","75","61","86","84"
  ]

  constructor(private router : Router, private toastr : ToastrService) { }

  login(username : string, password : string){
    if(username == "19201180"){
      if(this.userPassword.includes(password) == true){
        this.loggedIn = true;
        if(this.loggedIn){
          localStorage.setItem('Y', 'true');
          this.toastr.success("Anda Berhasil Login");
          this.router.navigate(["/dashboard/default"]);
        } else {
          this.toastr.error("Terjadi Kesalahan");
        }
      } else{
        this.toastr.error("password yang dimasulan salah");
      }
    } else {
      this.toastr.error("username yang dimasulan tidak valid");
    }
    this.loggedIn = (username == "19201180" && this.userPassword.includes(password));
    
  }

  logout(){
    this.loggedIn = false;
    this.router.navigate(["/"]);
  }

  isAuthenticated(){
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(localStorage.getItem("Y"));
        }, 1000);
      }
    );
    return promise;
  }


}

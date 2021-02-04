import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './service/auth.service';
import { Status, User } from './service/user';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {

  form : FormGroup;
  status : string;
  isLogin = false;


  constructor(
    private service : AuthService,
    private _toastr : ToastrService,
    private formBuilder : FormBuilder,
    private httpKlien : HttpClient,
    private router : Router
) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: this.formBuilder.control(null),
      password: this.formBuilder.control(null),
    });
  }

  onLogin(){
    this.login(this.form.value.username, this.form.value.password);
  }

  login(username: string, password: string): void{
    document.getElementById('login-loader').style.display = 'inline';
    document.getElementById('loader-text').style.display = 'none';
    const userAdmin = new User();
    userAdmin.userName = username;
    userAdmin.userPassword = password;
    this.httpKlien.post(environment.urlAuth  + '/auth/login', userAdmin
    ).pipe(map(data => data as Status))
    .subscribe( data => {
        this.isLogin = data.isValid;
        if(this.isLogin){
            localStorage.setItem('token', data.token);
            localStorage.setItem('fullName', data.fullName);
            this._toastr.success("Anda Berhasil Login");
            this.router.navigate(['/dashboard/default']);
            document.getElementById('login-loader').style.display = 'none';
            document.getElementById('loader-text').style.display = 'inline';
        } else {
          this._toastr.error("Terjadi kesalahan");
          document.getElementById('login-loader').style.display = 'none';
          document.getElementById('loader-text').style.display = 'inline';
        }
    });
  }


}

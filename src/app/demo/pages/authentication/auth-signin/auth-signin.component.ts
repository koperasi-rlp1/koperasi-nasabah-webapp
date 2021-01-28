import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {

  form : FormGroup;

  constructor(private formBuilder : FormBuilder,private authService : AuthService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: this.formBuilder.control(null),
      password: this.formBuilder.control(null),
    });
  }

  onLogin(){
    this.authService.login(this.form.value.username, this.form.value.password);
  }

}

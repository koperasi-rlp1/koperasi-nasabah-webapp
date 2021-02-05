import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare var require;
const randomWords = require('random-words');

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss']
})
export class AuthSignupComponent implements OnInit {

  form : FormGroup;
  seePassword = false;
  type : string = "password";
  formNumber : number = 1;

  constructor(private formBuilder : FormBuilder, private toastr : ToastrService) {
    this.form = this.formBuilder.group({
      userName: this.formBuilder.control(null),
      userPassword: this.formBuilder.control(null),
      retypePassword: this.formBuilder.control(null),
      firstName: this.formBuilder.control(null),
      lastName: this.formBuilder.control(null),
      gender: this.formBuilder.control(null),
      email: this.formBuilder.control(null),
      phoneNumber: this.formBuilder.control(null),
      birthDate: this.formBuilder.control(null),
      accept: this.formBuilder.control(null),
    });
   }

  ngOnInit() {
    console.log(randomWords(1));
  }

  prevForm(){
    this.formNumber = 1;
  }

  nextForm(){
    if(this.form.value.retypePassword != this.form.value.userPassword){
      this.toastr.error("Varify password must be same");
    }else {
      this.formNumber = 2;
    }
  }

  showPassword(){
    this.seePassword = true;
    this.type = "text";
  }

  hidePassword(){
    this.seePassword = false;
    this.type = "password";
  }

}

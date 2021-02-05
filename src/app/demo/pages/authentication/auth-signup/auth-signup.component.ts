import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  acceptform : FormGroup;
  seePassword = false;
  type : string = "password";
  formNumber : number = 1;
  formatNumber = "+62";

  constructor(private formBuilder : FormBuilder, private toastr : ToastrService, private renderer : Renderer2) {
    this.form = this.formBuilder.group({
      userName: this.formBuilder.control(null, [Validators.required]),
      userPassword: this.formBuilder.control(null, [Validators.required]),
      retypePassword: this.formBuilder.control(null, [Validators.required]),
      firstName: this.formBuilder.control(null, [Validators.required]),
      lastName: this.formBuilder.control(null, [Validators.required]),
      gender: this.formBuilder.control(null, [Validators.required]),
      email: this.formBuilder.control(null, [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      phoneNumber: this.formBuilder.control(null, [Validators.required]),
      birthDate: this.formBuilder.control(null, [Validators.required])
    });

    this.acceptform = this.formBuilder.group({
      accept: this.formBuilder.control(null)
    })
   }

  ngOnInit() {


    console.log(randomWords(1));

    let script = this.renderer.createElement('script');
    script.defer = true;
    script.async = true;
    script.src = 'https://www.google.com/recaptcha/api.js';
    this.renderer.appendChild(document.body, script);

  }

  verification(){
    if(this.form.get("retypePassword").touched && this.form.value.retypePassword != this.form.value.userPassword){
      console.log("true");
      document.getElementById("confirmPassword").style.borderColor = "red";
    }
  }

  prevForm(){
    this.formNumber = 1;
  }

  nextForm(){
    if(this.form.value.retypePassword != this.form.value.userPassword){
      this.toastr.error("Verify password must be same");
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

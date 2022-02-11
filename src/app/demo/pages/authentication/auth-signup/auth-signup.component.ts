import { Nasabah } from './../auth-signin/service/user';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth-signin/service/auth.service';
import { Status, StatusChecking, User } from '../auth-signin/service/user';
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
  randomText = randomWords(1).toString();
  isLogin = false;
  jabatan : Array<any> = null;
  formPembayaran : FormGroup;
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;

  constructor(private formBuilder : FormBuilder,
    private toastr : ToastrService,
    private service : AuthService,
    private httpKlien : HttpClient,
    private router : Router,
    private titleService : Title) {
    this.form = this.formBuilder.group({
      namaAwal: this.formBuilder.control(null, [Validators.required]),
      namaAkhir: this.formBuilder.control(null, [Validators.required]),
      jenisKelamin: this.formBuilder.control(null, [Validators.required]),
      noHp: this.formBuilder.control(null, [Validators.required]),
      tanggalLahir: this.formBuilder.control(null, [Validators.required]),
      nip: this.formBuilder.control(null, [Validators.required]),
      unitOperasional: this.formBuilder.control(null),
      accept: this.formBuilder.control(null),
      userName: this.formBuilder.control(null, [Validators.required]),
      userPassword: this.formBuilder.control(null, [Validators.required]),
      retypePassword: this.formBuilder.control(null, [Validators.required]),
      jabatan: this.formBuilder.control(null, [Validators.required]),
      email: this.formBuilder.control(null, [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
    });

    this.acceptform = this.formBuilder.group({
      verificateCode : this.formBuilder.control(null)
    })

    this.formPembayaran = this.formBuilder.group({
      fileBuktiPembayaran : this.formBuilder.control(null)
    })
   }

  ngOnInit() {

    this.service.jabatan().subscribe(data => {
      this.jabatan = data.body;
    })
    this.titleService.setTitle('Sign Up' + ' | Koperasi App');

  }

  verification(){
    if(this.form.get("retypePassword").touched && this.form.value.retypePassword != this.form.value.userPassword){
      console.log("true");
      document.getElementById("confirmPassword").style.borderColor = "red";
    }
  }

  submit(){
    if(this.form.valid){
      let value = new Nasabah();
      value.namaNasabah = this.form.value.namaAwal + ' ' + this.form.value.namaAkhir;
      value.nip = this.form.value.nip;
      value.unitOperasional = this.form.value.unitOperasional;
      value.username = this.form.value.userName;
      value.password = this.form.value.userPassword;
      value.jenisKelamin = this.form.value.jenisKelamin;
      value.email = this.form.value.email;
      value.noHp = this.formatNumber + this.form.value.noHp;
      value.tanggalLahir = this.form.value.tanggalLahir;
      value.jabatan = this.form.value.jabatan;
      this.service.register(value).subscribe(response => {
        localStorage.setItem('batch', response.body.nip)
        this.formNumber = 3;
      })
    }
  }


  selectFile(event){
    var filename = event.target.files[0].name;
    $("#label-file").text(filename);
    this.selectedFiles = event.target.files;
  }

  regis(){
    document.getElementById('login-loader').style.display = 'inline';
    document.getElementById('loader-text').style.display = 'none';
    this.progress = 0;
    if(this.selectedFiles.item(0) != undefined){
      this.currentFile = this.selectedFiles.item(0);
      this.service.upload(this.currentFile).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round( 100 * event.loaded / event.total);
          }else if (event instanceof HttpResponse) {
            console.log(event.body);
            let value = new Nasabah();
            value.fileBuktiPembayaran = event.body.file;
            value.nip = localStorage.getItem('batch');
            this.service.update(value).subscribe(
              event => {
                localStorage.removeItem('batch');
                this.toastr.success("Registrasi Berhasi", "Silahkan Menunggu Konfirmasi Dari Admin");
                this.router.navigate(['/transaksi/simpanan-wajib/menunggu-konfirmasi']);
              },
              err => {
                document.getElementById('login-loader').style.display = 'none';
                document.getElementById('loader-text').style.display = 'inline';
                $(':button[type="submit"]').prop('disabled', false);
                this.progress = 0;
                this.toastr.error("Terjadi Kesalahan");
                this.currentFile = undefined;
              });
          }
        },
        err => {
          document.getElementById('login-loader').style.display = 'none';
          document.getElementById('loader-text').style.display = 'inline';
          this.progress = 0;
          alert('Could not upload the file!');
          this.currentFile = undefined;
        });
    } else {
      document.getElementById('login-loader').style.display = 'none';
      document.getElementById('loader-text').style.display = 'inline';
      this.toastr.error("File TIdak Valid");
      this.currentFile = undefined;
    }
  }

  checkAccount(username: string, password: string){
    const userAdmin = new User();
    userAdmin.userName = username;
    userAdmin.userPassword = password;
    this.httpKlien.post(environment.urlAuth  + '/auth/check-account', userAdmin
    ).pipe(map(data => data as StatusChecking))
    .subscribe( data => {
        if(data.status !== "Username is not valid"){
          if(data.status !== "Password is not correct"){
            if(data.status !== "Account must verified"){
              this.login(username, password);
            }else{
              this.toastr.error("Some Error", data.status);
          document.getElementById('login-loader').style.display = 'none';
          document.getElementById('loader-text').style.display = 'inline';
            }
          } else{
            this.toastr.error("Some Error", data.status);
          document.getElementById('login-loader').style.display = 'none';
          document.getElementById('loader-text').style.display = 'inline';
          }
        }else{
          this.toastr.error("Some Error", data.status);
          document.getElementById('login-loader').style.display = 'none';
          document.getElementById('loader-text').style.display = 'inline';
        }
    });
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
            this.toastr.success("Akun Berhasil Terdaftar");
            this.service.getData( userAdmin.userName, userAdmin.userPassword).subscribe(data =>{
              localStorage.setItem( "currentLogin", JSON.stringify(data.body));
              this.router.navigate(['/dashboard/default']);
              document.getElementById('login-loader').style.display = 'none';
              document.getElementById('loader-text').style.display = 'inline';
            })
        } else {
          this.toastr.error("Terjadi kesalahan");
          document.getElementById('login-loader').style.display = 'none';
          document.getElementById('loader-text').style.display = 'inline';
        }
    });
  }


  prevForm(){
    this.formNumber = this.formNumber-1;
  }

  nextForm(){
    if(this.formNumber == 1){
      if(this.form.valid){
        if(this.form.value.retypePassword != this.form.value.userPassword){
          this.toastr.error("Verify password must be same");
        }else {
          const nip : string = this.form.value.nip;
          this.service.checking(nip, this.form.value.userName).subscribe(data => {
            console.log(data.body)
            if(data.body.message == "Data Unique"){
              this.formNumber = 2;
            } else {
              this.toastr.info(data.body.message)
            }
          })
        }
      } else {
        this.toastr.error("Form Harus di isi lengkap");
      }
    } else if (this.formNumber == 2){
      this.formNumber = 3
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

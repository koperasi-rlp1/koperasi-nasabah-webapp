import { SaveSukaRela } from './../../../../model/simpanan-sukarela';
import { SimpananSukaRelaService } from './../simpanan-sukarela.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simpanan-sukarela-tambah',
  templateUrl: './simpanan-sukarela-tambah.component.html',
  styleUrls: ['./simpanan-sukarela-tambah.component.scss']
})
export class SimpananSukarelaTambahComponent implements OnInit {

  formTambah : FormGroup;
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;


  constructor(
    private formBuilder : FormBuilder,
    private service : SimpananSukaRelaService,
    private router : Router,
    private _toastr : ToastrService,
  ) { }

  ngOnInit(): void {


    this.formTambah = this.formBuilder.group({
      nominalTransaksi: this.formBuilder.control(null, [Validators.required]),
      deskripsi: this.formBuilder.control(null, [Validators.required]),
      idNasabah : this.formBuilder.control(null),
      buktiPembayaran : this.formBuilder.control(null),
      jenisTransaksi :  this.formBuilder.control("SIMPANAN SUKA RELA")
    });

  }

  selectFile(event){
    var filename = event.target.files[0].name;
    $("#label-file").text(filename);
    this.selectedFiles = event.target.files;
  }

  save() {
    document.getElementById('login-loader').style.display = 'inline';
    document.getElementById('loader-text').style.display = 'none';
    $(':button[type="submit"]').prop('disabled', true);
    const value = JSON.parse(localStorage.getItem("currentLogin"));
    this.progress = 0;
    this.currentFile = this.selectedFiles.item(0);
    console.log(this.currentFile);
    let data : SaveSukaRela = this.formTambah.value;
    data.idNasabah = value.idBackup;
    if(this.formTambah.valid) {
        if(this.currentFile != undefined){
          this.service.upload(this.currentFile).subscribe(
            event => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round( 100 * event.loaded / event.total);
              }else if (event instanceof HttpResponse) {
                console.log(event.body);
                data.buktiPembayaran = event.body.file;
                this.service.save(data).subscribe(
                  event => {
                    this._toastr.success("Data Telah Diajukan");
                    this.router.navigate(['/transaksi/simpanan-sukarela']);
                  },
                  err => {
                    document.getElementById('login-loader').style.display = 'none';
                    document.getElementById('loader-text').style.display = 'inline';
                    $(':button[type="submit"]').prop('disabled', false);
                    this.progress = 0;
                    this._toastr.error("Terjadi Kesalahan");
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
          this._toastr.error("Bukti Pembayaran Tidak Valid");
          document.getElementById('login-loader').style.display = 'none';
          document.getElementById('loader-text').style.display = 'inline';
          $(':button[type="submit"]').prop('disabled', false);
        }
      } else {
        this._toastr.error("Form Pengisian Tidak Valid");
        document.getElementById('login-loader').style.display = 'none';
        document.getElementById('loader-text').style.display = 'inline';
        $(':button[type="submit"]').prop('disabled', false);
      }
      this.selectedFiles = undefined;
    }



}

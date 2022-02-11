import { SaveWajib } from './../../../../model/simpanan-wajib';
import { SimpananWajibService } from './../simpanan-wajib.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simpanan-wajib-tambah',
  templateUrl: './simpanan-wajib-tambah.component.html',
  styleUrls: ['./simpanan-wajib-tambah.component.scss']
})
export class SimpananWajibTambahComponent implements OnInit {

  formTambah : FormGroup;
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;

  bulan = [
    "Januari",
    "Febuari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
  ]


  constructor(
    private formBuilder : FormBuilder,
    private service : SimpananWajibService,
    private router : Router,
    private _toastr : ToastrService,
  ) { }

  ngOnInit(): void {


    this.formTambah = this.formBuilder.group({
      nominalTransaksi: this.formBuilder.control(100000),
      deskripsi: this.formBuilder.control(null, [Validators.required]),
      idNasabah : this.formBuilder.control(null),
      buktiPembayaran : this.formBuilder.control(null),
      jenisTransaksi :  this.formBuilder.control("SIMPANAN WAJIB")
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
    let data : SaveWajib = this.formTambah.value;
    data.idNasabah = value.idBackup;
    if(this.formTambah.valid) {
        if(this.selectedFiles.item(0) != undefined){
          this.currentFile = this.selectedFiles.item(0);
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
                    this.router.navigate(['/transaksi/simpanan-wajib/menunggu-konfirmasi']);
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

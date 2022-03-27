import { ToastrService } from 'ngx-toastr';
import { PinjamanService } from './pinjaman.service';
import { Nasabah } from './../../../pages/authentication/auth-signin/service/user';
import { Component, OnInit } from '@angular/core';
import { response } from 'express';

@Component({
  selector: 'app-breadcrumb-paging',
  templateUrl: './breadcrumb-paging.component.html',
  styleUrls: ['./breadcrumb-paging.component.scss']
})
export class BreadcrumbPagingComponent implements OnInit {
  // public breadcrumbTheme: string;
  // public defaultPage: number;
  // public noDirectionPage: number;
  // public boundaryPage: number;
  // public advancePage: number;
  // public sizePage: number;
  // public alignmentPage: number;
  // public disablePage: number;
  // public isDisabled: boolean;
  pages : string;
  datanasabah = JSON.parse(localStorage.getItem("currentLogin"));

  constructor(
    private service : PinjamanService,
    private toastr : ToastrService
  ) {
    // this.breadcrumbTheme = 'theme1';
    // this.defaultPage = 5;
    // this.noDirectionPage = 4;
    // this.boundaryPage = 3;
    // this.advancePage = 5;
    // this.sizePage = 3;
    // this.alignmentPage = 3;
    // this.disablePage = 3;
    // this.isDisabled = true;
  }

  ngOnInit() {
    this.pages = "checking";
    this.checkStatusKeanggotaan();
  }

  checkStatusKeanggotaan(){
    if(this.datanasabah.idStatusKeanggotaan == 5){
      this.pages = "checked";
    }
  }

  checkAkun(){
    let nasabah = new Nasabah();
    nasabah = this.datanasabah;
    this.service.cekAkunPinjam(nasabah).subscribe(response=> {
      console.log(response);
      if(response.status == 200){
        this.toastr.warning(response.body)
      }
    }, error => {
      if(error.status == 200){
        if(error.error.text == "Nasabah Telah Memenuhi Syarat Untuk Melakukan Pinjaman"){
          nasabah.idStatusKeanggotaan = 5;
          localStorage.setItem("currentLogin", JSON.stringify(nasabah));
          window.location.reload();
        } else {
          this.toastr.warning(error.error.text)
        }
      }
    })
  }

}

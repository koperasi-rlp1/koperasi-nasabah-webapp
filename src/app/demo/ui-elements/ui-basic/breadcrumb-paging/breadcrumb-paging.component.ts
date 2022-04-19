import { PinjamanTerima } from './../../../model/pinjaman';
import { ToastrService } from 'ngx-toastr';
import { PinjamanService } from './pinjaman.service';
import { Nasabah } from './../../../pages/authentication/auth-signin/service/user';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { response } from 'express';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesRequest } from 'src/app/demo/model/DatatablesRequest';

@Component({
  selector: 'app-breadcrumb-paging',
  templateUrl: './breadcrumb-paging.component.html',
  styleUrls: ['./breadcrumb-paging.component.scss']
})
export class BreadcrumbPagingComponent implements OnInit, OnDestroy {


  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();
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
      this.dtOptions = {
        lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, 'All']],
        pagingType: 'full_numbers',
        serverSide: true,
        searching: false,
        processing: true,
        autoWidth: false,
        dom: 't<\'row\'<\'col-sm-12\'ip><\'col-sm-12\'l>>',
        order: [1, 'desc'],
        ajax: (dataTablesParameters: DatatablesRequest, callback) => {
          let dataParam = new PinjamanTerima();
          const value = JSON.parse(localStorage.getItem("currentLogin"));
          dataParam.idNasabah = value.idBackup;
          dataTablesParameters.extraParam = dataParam;
          this.service.datatables(dataTablesParameters).subscribe(resp => {
            callback({
              recordsTotal: resp.recordTotal,
              recordsFiltered: resp.recordFiltered,
              data: resp.data,
              draw: resp.draw
            });
          });
        },
        columns: [
          {
            title: 'Nomor Transaksi',
            data: 'idTransaksi',
            className: 'text-center nopadding'
          },
          {
            title: 'Total Pinjaman',
            data: 'totalPinjaman',
            render: $.fn.dataTable.render.number('.', ',', 2, 'Rp ')
          },
          {
            title: 'Sisa Pinjaman',
            data: 'sisaPinjaan',
            render: $.fn.dataTable.render.number('.', ',', 2, 'Rp ')
          },
          {
            title: 'Tanggal',
            data: 'tanggalApprove'
          },
          {
            title: 'Tujuan Peminjaman',
            data: 'tujuanPinjam'
          },
          {
            title: 'Bulan Bayar',
            data: 'bulanBayar',
            orderable: false,
            className: 'text-center nopadding'
            // render(data, type, row) {
            //   return `<img src="/koperasi-service/api/transaksi-approval/file/${data}" width="100px">`;
            // }
          },
          {
            title: 'Sisa Bulan Bayar',
            data: 'sisaBulanBayar',
            orderable: false,
            className: 'text-center nopadding'
            // render(data, type, row) {
            //   return `<img src="/koperasi-service/api/transaksi-approval/file/${data}" width="100px">`;
            // }
          },
          // ,
          // {
          //   title : 'Edit',
          //   data : 'id',
          //   orderable: false,
          //   render(data, type, row){
          //     return `<button type="button" class="btn btn-primary btn-default" id="btnEdit">
          //     Edit</button>`;
          //   },
          // },
        ],
        rowCallback: (row: Node, data: PinjamanTerima, index: number) => {
          // $('#btnDeletet', row).click(() => {
          //   // this.router.navigate(['/admin-page/arsip/edit/'+data.id]);
          // });
        }
      };
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

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}

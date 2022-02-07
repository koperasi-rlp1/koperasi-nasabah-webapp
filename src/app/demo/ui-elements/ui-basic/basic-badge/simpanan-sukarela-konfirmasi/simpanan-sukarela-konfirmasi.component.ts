import { Title } from '@angular/platform-browser';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesRequest } from 'src/app/demo/model/DatatablesRequest';
import { DataTransaksi } from 'src/app/demo/model/transaksi';
import { SimpananSukaRelaService } from '../simpanan-sukarela.service';

@Component({
  selector: 'app-simpanan-sukarela-konfirmasi',
  templateUrl: './simpanan-sukarela-konfirmasi.component.html',
  styleUrls: ['./simpanan-sukarela-konfirmasi.component.scss']
})
export class SimpananSukarelaKonfirmasiComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, {static: false})
  dtElement : DataTableDirective;
  dtOptions : any;
  dtTrigger : Subject<any> = new Subject();

  public radioButtons: string;
  public checkBox: any;

  constructor(
    private service : SimpananSukaRelaService
  ) {
    this.radioButtons = '1';
    this.checkBox = {
      left: true,
      center: false,
      right: false
    };
  }

  ngOnInit() {

    this.dtOptions = {
      lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, 'All']],
      pagingType: 'full_numbers',
      serverSide: true,
      searching: false,
      processing: true,
      autoWidth: false,
      dom: 't<\'row\'<\'col-sm-12\'ip><\'col-sm-12\'l>>',
      order: [1, 'desc'],
      ajax : (dataTablesParameters: DatatablesRequest, callback) => {
        let dataParam = new DataTransaksi();
        const value = JSON.parse(localStorage.getItem("currentLogin"));
        dataParam.idNasabah = value.idBackup;
        dataParam.jenisTransaksi = "SIMPANAN SUKA RELA";
        dataTablesParameters.extraParam = dataParam;
        this.service.datatablesApproval(dataTablesParameters).subscribe( resp => {
          callback({
            recordsTotal : resp.recordTotal,
            recordsFiltered : resp.recordFiltered,
            data : resp.data,
            draw : resp.draw
          });
        });
      },
      columns: [{
        title : 'Nomor Approval',
        data : 'idApproval'
      },
    {
      title: 'Nominal Transaksi',
      data : 'nominalTransaksi'
    },
    {
      title : 'Tanggal',
      data : 'tanggal'
    },
    {
      title : 'Keterangan',
      data : 'deskripsi'
    },
    {
      title : 'Bukti Pembayaran',
      data : 'buktiPembayaran',
      orderable: false,
      render(data, type, row){
        return `<img src="/koperasi-service/api/transaksi-approval/file/${data}" width="100px">`;
      }
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
    {
      title : 'Aksi',
      data : 'id',
      orderable: false,
      render(data, type, row){
        return `<button type="button" class="btn btn-outline-danger"><i class="feather icon-trash"></i>Delete</button> &nbsp;&nbsp;&nbsp;
        <button type="button" class="btn btn-outline-secondary"><i class="feather icon-edit"></i>Edit</button>`;
      },
    }
    ],
    // rowCallback: (row: Node, data: Arsip, index: number) => {
    //   $('#btnEdit', row).click(() => {
    //     this.router.navigate(['/admin-page/arsip/edit/'+data.id]);
    //   });
    // }
  };

    //   document.querySelector('body').addEventListener('click', (event) => {
    //   let target = <Element>event.target;
    //   if(target.tagName.toLowerCase() === 'button' && $(target).hasClass('delete')) {
    //     const swalWithBootstrapButtons = Swal.mixin({
    //       customClass: {
    //         confirmButton: 'btn btn-success',
    //         cancelButton: 'btn btn-danger'
    //       },
    //       buttonsStyling: false,
    //     });
    //     swalWithBootstrapButtons.fire({
    //       title: 'Yakin?',
    //       text: 'Data yang sudah di hapus tak bisa dikembalikan!',
    //       icon: 'warning',
    //       // type: 'warning'
    //       showCancelButton: true,
    //       showCloseButton: true,
    //       confirmButtonText: 'delete!',
    //       cancelButtonText: 'cancel!',
    //       reverseButtons: true
    //     }).then((_result) => {
    //     if (_result.value) {
    //       console.log(`Delete Data By Id`);
    //       this.service.delete(target.getAttribute('data-element-id')).subscribe(resp => {
    //         this._toastr.success("Data telah dihapus");
    //         console.log(resp);
    //         window.location.reload();
    //       }, error => {
    //         console.error(error.message);
    //       });
    //     } else {
    //     }
    //   });
    //   }
    // }
    // );


  }

  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();
  }


}

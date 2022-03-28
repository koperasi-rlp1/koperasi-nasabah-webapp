import { PinjamanApproval } from './../../../../model/pinjaman';
import { PinjamanService } from './../pinjaman.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesRequest } from 'src/app/demo/model/DatatablesRequest';

@Component({
  selector: 'app-pinjaman-menunggu-konfirmasi',
  templateUrl: './pinjaman-menunggu-konfirmasi.component.html',
  styleUrls: ['./pinjaman-menunggu-konfirmasi.component.scss']
})
export class PinjamanMenungguKonfirmasiComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private service: PinjamanService
  ) { }

  ngOnInit(): void {

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
        let dataParam = new PinjamanApproval();
        const value = JSON.parse(localStorage.getItem("currentLogin"));
        dataParam.idNasabah = value.idBackup;
        dataTablesParameters.extraParam = dataParam;
        this.service.datatablesApproval(dataTablesParameters).subscribe(resp => {
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
          title: 'Nomor Approval',
          data: 'idApproval',
          className: 'text-center nopadding'
        },
        {
          title: 'Nominal Pinjaman',
          data: 'nominalTransaksi',
          render: $.fn.dataTable.render.number('.', ',', 2, 'Rp ')
        },
        {
          title: 'Tanggal',
          data: 'tanggal'
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
          title: 'Aksi',
          data: 'id',
          orderable: false,
          render(data, type, row) {
            return `<button type="button" id="btnDelete" class="btn btn-outline-danger"><i class="feather icon-trash"></i>Delete</button>`;
          },
        }
      ],
      rowCallback: (row: Node, data: PinjamanApproval, index: number) => {
        $('#btnDeletet', row).click(() => {
          // this.router.navigate(['/admin-page/arsip/edit/'+data.id]);
        });
      }
    };

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}

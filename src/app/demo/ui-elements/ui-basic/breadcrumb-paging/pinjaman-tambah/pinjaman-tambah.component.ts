import { PinjamanService } from './../pinjaman.service';
import { SavePinjaman } from './../../../../model/pinjaman';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

declare var require;
const Swal = require('sweetalert2');

@Component({
  selector: 'app-pinjaman-tambah',
  templateUrl: './pinjaman-tambah.component.html',
  styleUrls: ['./pinjaman-tambah.component.scss']
})
export class PinjamanTambahComponent implements OnInit {

  formTambah: FormGroup;
  panjangCicilan = [
    {
      value: 1,
      deskripsi: "1 Bulan"
    },
    {
      value: 2,
      deskripsi: "2 Bulan"
    },
    {
      value: 4,
      deskripsi: "4 Bulan"
    },
    {
      value: 6,
      deskripsi: "6 Bulan"
    },
    {
      value: 10,
      deskripsi: "10 Bulan"
    },
    {
      value: 12,
      deskripsi: "1 Tahun"
    }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _toastr: ToastrService,
    private service: PinjamanService
  ) { }

  ngOnInit(): void {

    this.formTambah = this.formBuilder.group({
      nominalTransaksi: this.formBuilder.control(null, [Validators.required]),
      tujuanPinjam: this.formBuilder.control(null, [Validators.required]),
      idNasabah: this.formBuilder.control(null),
      bulanBayar: this.formBuilder.control(null, [Validators.required])
    });

  }

  save() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons.fire({
      title: 'Anda Yakin?',
      text: 'Pengajuan Pinjaman dengan Jumlah RP.'+this.formTambah.get('nominalTransaksi').value+' dengan pembayaran selama '+ this.formTambah.get('bulanBayar').value+' Bulan',
      type: 'error',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        document.getElementById('login-loader').style.display = 'inline';
        document.getElementById('loader-text').style.display = 'none';
        $(':button[type="submit"]').prop('disabled', true);
        if (this.formTambah.valid) {
          const value = JSON.parse(localStorage.getItem("currentLogin"));
          let data: SavePinjaman = this.formTambah.value;
          data.idNasabah = value.idBackup;
          this.service.save(data).subscribe(
            event => {
              this._toastr.success("Data Telah Diajukan");
              this.router.navigate(['/transaksi/pinjaman/menunggu-konfirmasi']);
            },
            err => {
              document.getElementById('login-loader').style.display = 'none';
              document.getElementById('loader-text').style.display = 'inline';
              $(':button[type="submit"]').prop('disabled', false);
            });
        }
      }
    });
  }

}

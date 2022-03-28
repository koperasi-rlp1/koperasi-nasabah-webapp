import { ToastrService } from 'ngx-toastr';
import { DataSaldoService } from './data-saldo.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basic-elements',
  templateUrl: './basic-elements.component.html',
  styleUrls: ['./basic-elements.component.scss']
})
export class BasicElementsComponent implements OnInit {

  datauser = JSON.parse(localStorage.getItem("currentLogin"));
  formNasabah : FormGroup
  formSaldoNasabah : FormGroup
  formPinjamanNasabah : FormGroup

  constructor(
    private formBuilder : FormBuilder,
    private service : DataSaldoService,
    private toast : ToastrService
  ) { }

  ngOnInit() {
    this.formNasabah = this.formBuilder.group({
      nip : this.formBuilder.control(this.datauser.nip),
      namaNasabah : this.formBuilder.control(this.datauser.namaNasabah),
      jabatan :  this.formBuilder.control(this.datauser.jabatan),
      unitOperasional :  this.formBuilder.control(this.datauser.unitOperasional)
    });

    this.formSaldoNasabah = this.formBuilder.group({
      nip : this.formBuilder.control(null),
      namaNasabah : this.formBuilder.control(null),
      saldoWajib :  this.formBuilder.control(null),
      saldoSukaRela :  this.formBuilder.control(null),
      trWajib :  this.formBuilder.control(null),
      trSukaRela :  this.formBuilder.control(null),
      saldoAkhir :  this.formBuilder.control(null),
      simpananPokok :  this.formBuilder.control(null)
    });

    this.formPinjamanNasabah = this.formBuilder.group({
      nip : this.formBuilder.control(null),
      namaNasabah : this.formBuilder.control(null),
      jumlahPinjaman :  this.formBuilder.control(null),
      pinjamanSelesai :  this.formBuilder.control(null),
      pinjamanBelumSelesai :  this.formBuilder.control(null),
      totalUangPinjam :  this.formBuilder.control(null),
      totalUangBayar :  this.formBuilder.control(null),
      sisaPinjamBelumBayar :  this.formBuilder.control(null)
    });

    this.getDataSaldoNasabah();
    this.getDataPinjamanNasabah();
  }

  getDataSaldoNasabah(){
    this.service.getDataSaldo(this.datauser.nip).subscribe(data => {
      this.formSaldoNasabah.patchValue({
        nip : data.body.nip,
        namaNasabah : data.body.namaNasabah,
        saldoWajib : data.body.saldoWajib,
        saldoSukaRela : data.body.saldoSukaRela,
        trWajib : data.body.trWajib,
        trSukaRela : data.body.trSukaRela,
        saldoAkhir : data.body.saldoAkhir,
        simpananPokok : data.body.simpananPokok
      })
    }, error =>{
      this.toast.error("Gagal Mendapatkan Data Saldo Nasabah")
    })
  }

  getDataPinjamanNasabah(){
    this.service.getDataPinjaman(this.datauser.nip).subscribe(data => {
      this.formPinjamanNasabah.patchValue({
        nip : data.body.nip,
        namaNasabah : data.body.namaNasabah,
        jumlahPinjaman : data.body.jumlahPinjaman,
        pinjamanSelesai : data.body.pinjamanSelesai,
        pinjamanBelumSelesai : data.body.pinjamanBelumSelesai,
        totalUangPinjam : data.body.totalUangPinjam,
        totalUangBayar : data.body.totalUangBayar,
        sisaPinjamBelumBayar : data.body.sisaPinjamBelumBayar
      })
    }, error =>{
      this.toast.error("Gagal Mendapatkan Data Saldo Nasabah")
    })
  }

}

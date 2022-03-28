export class SavePinjaman{
  nominalTransaksi : any;
  tujuanPinjam : any;
  idNasabah : any;
  bulanBayar : any;
}

export class PinjamanApproval{
  id : any;
  idNasabah : any;
  nominalTransaksi : any;
  tanggal : any;
  waktu : any;
  bulanBayar : any;
  tujuanPinjam : any;
  nip : any;
  namaNasabah : any;
}

export class PinjamanTolak{
  id : any;
  idNasabah : any;
  nominalTransaksi : any;
  bulanBayar : any;
  tujuanPinjam : any;
  adminTolak : any;
  tanggalTolak : any;
  alasanTolak : any;
  idTransaksi : any;
  nip : any;
  namaNasabah : any;
}

export class PinjamanTerima{
  id : any;
  idNasabah : any;
  totalPinjaman : any;
  sisaPinjaman : any;
  bulanBayar : any;
  sisaiBulanBayar : any;
  idApproval : any;
  tanggalApprove : any;
  adminApprove : any;
  idTransaksi : any;
  tujuanPinjam : any;
  nip : any;
  namaNasabah : any;
}

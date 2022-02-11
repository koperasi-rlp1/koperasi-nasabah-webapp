
export class User{

    userName : string;
    userPassword : string;
    groupId : number;
    token : string;
}

export class NasabahLogin {

    username : string;
    password : string;
}

export class Nasabah{
    namaNasabah : any;
    nip : any;
    unitOperasional : any;
    username : any;
    password : any;
    jenisKelamin : any;
    email : any;
    noHp : any;
    tanggalLahir : any;
    jabatan : any;
    idBackup : any;
    idStatusKeanggotaan : any;
    fileBuktiPembayaran : any;
}

export class Status{

    fullName : string;
    isValid : boolean;
    token : string;
    roles : string[];
}

export class NasabahCheck {

    nip : string;
    since : string;
    token : string;
}

export class StatusChecking{

    status : string;
}

export class DataNasabah{

    nip? : string;
    namaNasabah? : string;
    idBackup? : string;
    email? : string;
    noHp? : string;
    jabatan? : string;
    unitOperasional? : string;
    idStatusKeanggotaan? : string;
    fileBuktiPembayaran? : string;
    createdDate? : string;

}

export class NasabahLogResponse{

    responseMessage : string;
    token : string;
    isValid : boolean;
    dataNasabah : DataNasabah;
}

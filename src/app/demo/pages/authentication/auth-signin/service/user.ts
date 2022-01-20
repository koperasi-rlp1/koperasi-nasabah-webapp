
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

export class NewUser{
    firstName : any;
    lastName : any;
    userName : any;
    userPassword : any;
    gender : CharacterData;
    email : any;
    phoneNumber : any;
    birthDate : any;
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

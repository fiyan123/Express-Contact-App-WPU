// Arguments Tanpa Parameter

function tambah() {
    var hasil = 0;
    for (let i = 0; i < arguments.length; i++) {
        hasil += arguments[i];
        
    }
    return hasil;
}

let coba = tambah(1,2,3,4,5);
alert(coba)
// function
const cetakNama = (nama, umur) => {
    return `Halo Nama Saya ${nama}, umur saya ${umur},`;
}
// variable
const PI = 3.14;

// objek
const mahasiswa = {
    nama: 'Derbian',
    umur: 19,
    cetakMhs() {
        return `, Nama ${this.nama} berumur ${this.umur}`;
    },
};

// Class 
class Orang {
    constructor() {
        console.log('Class Orang Constructor');
    };
}
// 1
// module.exports.cetakNama = cetakNama;
// module.exports.PI = PI;
// module.exports.mahasiswa = mahasiswa;
// module.exports.Orang = Orang;

// 2
// module.exports = {
//     cetakNama: cetakNama,
//     PI: PI,
//     mahasiswa: mahasiswa,
//     Orang: Orang,
// }

// 3
module.exports = { cetakNama, PI, mahasiswa, Orang }
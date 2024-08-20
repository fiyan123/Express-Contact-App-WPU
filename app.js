// const person = {
//     namaAwal: "awal",
//     namaTengah: "tengah",
//     namaAkhir: "akhir",
// }

// for (const data in person) {
//     document.writeln(`<p>${data} : ${person[data]}</p>`);
// }

// For Of
// const names = ['dani','bani','boni'];
// for (const name of names) {
//     document.writeln(`<p>${name}</p>`);
// }

// With Statement
// const person = {
//     awalNama: "kano",
//     tengahNama: "janu",
//     akhirNama: "ujang",
// }

// with(person){
//     console.log(awalNama);
//     console.log(tengahNama);
//     console.log(akhirNama);
// }'

// Function Parameter
// function sayHello(namaAwal,namaAkhir) {
//     const say = `Hello ${namaAwal} ${namaAkhir}`;
//     return say;
// }
// const result = sayHello('dani','jojo');
// document.writeln(`${result}`);


function isContains(array, searchValue) {
    for (const element of array) {
        console.info(`cari ${element}`);
        if (element === searchValue) {
            return true;
        }
    }
    return false;
}
const array = [23,4,3,12,12,987,430,43,4,34,3,23,4,23,431,2];
const search = 43;
const found = isContains(array, search);
document.writeln(`${found}`);
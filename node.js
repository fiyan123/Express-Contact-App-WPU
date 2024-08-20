// synchronous
// const getUserSync = (id) => {
//     const nama = id === 1 ? 'orang satu' : 'nama apalah';

//     return {id, nama};
// }

// const userSatu = getUserSync(4);
// console.log(userSatu);

// Asynchronous
const getUser = (id, cb) => {
    const time = id === 1 ? 3000 : 2000;
    setTimeout(() => {
        const nama = id === 1 ? 'Pertama' : 'Kedua';
        cb({id, nama});
    }, time);
};

const userSatu = getUser(1, (hasil) => {
    console.log(hasil);
});

const userDua = getUser(2, (hasil) => {
    console.log(hasil);
});

const halo = 'Hello World';
console.log(halo);
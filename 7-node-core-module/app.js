const yargs = require("yargs");
const contacts = require("./contacts");

// Menambahkan Contact Baru
yargs.command({
    command: 'add',
    describe: 'Menambahkan Contact Baru',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'Email Anda',
            demandOption: false,
            type: 'string'
        },
        noHP: {
            describe: 'Nomor Hp Anda',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        contacts.simpanContact(argv.nama, argv.email, argv.noHP);
    }
}).demandCommand();

// Menampilkan Semua Contact
yargs.command({
    command: 'list',
    describe: 'Menampilkan Semua Nama & No HP',
    handler() {
        contacts.listContact();
    }
});

// Menampilkan Contact Berdasarkan Namaa
yargs.command({
    command: 'detail',
    describe: 'Menampilkan Detail Contact Berdasarkan Nama',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        contacts.detailContact(argv.nama);
    }
});

// Menghapus Contact Berdasarkan Nama
yargs.command({
    command: 'delete',
    describe: 'Menghapus Contact Berdasarkan Nama',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        contacts.deleteContact(argv.nama);
    }
});

yargs.parse();















// const contacts = require('./contacts.js');

// const main = async () => {
//     const nama  = await contacts.tulisPertanyaan('Masukkan Nama Anda : ');
//     const email = await contacts.tulisPertanyaan('Masukkan Email Anda : ');
//     const noHp  = await contacts.tulisPertanyaan('Masukkan No HP Anda : ');

//     contacts.simpanContact(nama, email, noHp);
// }

// main();

// membuat file secara syncronous
// try {
//     fs.writeFileSync('data/test.txt', 'Hello Dunia sync');
// } catch(error) {
//     console.log(error);
// }

// secara asynchronous
// fs.writeFile('data/test.txt', 'File Nya Ditimpa Secara Asynchronous', (e) => {
//     console.log(e);
// });

// Read file syncronous
// utf-8 untuk to string
// const data = fs.readFileSync('data/test.txt','utf-8');
// console.log(data);

// Read file asynchronous
// const data = fs.readFile('data/test.txt', 'utf-8',(err, data) => {
//     if (err) throw err;
//     console.log(data);
// });
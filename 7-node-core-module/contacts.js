// Core module
// file system
const chalk = require('chalk');
const fs = require('fs');
const validator = require('validator');
const { conflicts } = require('yargs');


// Membuat folder
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// membuat file contacts.json jika belum ada
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const loadContact = () => {
    // Baca file JSON yang ada
    const file = fs.readFileSync('data/contacts.json', 'utf8');
    const contacts = JSON.parse(file);
    return contacts;
}

const simpanContact = (nama, email, noHp) => {
    const contact = {
        nama: nama,
        email: email,
        noHp: noHp,
    };

    const contacts = loadContact();

    // duplicate contact
    const duplicate = contacts.find((contact) => contact.nama === nama);
    if (duplicate) {
        console.log(chalk.inverse.red.bold('Nama sudah ada didalam contact!, gunakan nama lain'));
        return false;
    }

    // cek email
    if (email) {
        if (!validator.isEmail(email)) {
            console.log(chalk.inverse.red.bold('Email tidak valid!!'));
            return false;
        }
    }

    // cek nomor hp
    if (!validator.isMobilePhone(noHp, 'id-ID')) {
        console.log(chalk.inverse.red.bold('Nomor HP tidak valid!!'));
        return false;
    }

    contacts.push(contact);

    // dibalikkan menjadi string
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log(chalk.inverse.green.bold('Terima Kasih'));
};

const listContact = () => { 
    console.log(chalk.inverse.cyan.bold('List Nama & Nomor HP'));
    const contacts = loadContact();
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}. ${contact.nama} - ${contact.noHp}`);
    });
};

const detailContact = (nama) => {
    const contacts = loadContact();

    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

    if (!contact) {
        console.log(chalk.inverse.red.bold(`${nama} Tidak Ditemukan!`));
        return false;
    }

    console.log(chalk.inverse.blue.bold(`Detail Kontak :`));
    console.log(`Nama Kontak : ${contact.nama}`);
    console.log(`No HP       : ${contact.noHp}`);
    if (contact.email) {
        console.log(`Email : ${contact.email}`);
    }    
};

const deleteContact = (nama) => {
    const contacts = loadContact();
    const newContacts = contacts.filter(
        (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
    );

    if (contacts.length === newContacts.length) {
        console.log(chalk.inverse.red.bold(`${nama} Tidak Ditemukan!`));
        return false;
    }

    fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts));
    console.log(chalk.inverse.green.bold(`Data Contact ${nama} Berhasil Dihapus!`));
};


module.exports = { simpanContact, listContact, detailContact, deleteContact };
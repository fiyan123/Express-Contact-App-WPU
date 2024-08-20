const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const { loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts } = require('./utils/contacts');
const { body, validationResult, check } = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const app = express()
const port = 3000

// Gunakan EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));

// Kirim Data url
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        cookie: { maxAge: 6000 },
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);
app.use(flash());

app.get('/', (req, res) => {

    const mahasiswa = [
        {
            nama: 'Ian',
            email: 'ian@gmail.com',
        },
        {
            nama: 'Dani',
            email: 'dani@gmail.com',
        },
        {
            nama: 'Isma',
            email: 'isma@gmail.com',
        },
    ];

    res.render('index',
        {
            nama: 'ian',
            title: 'Halaman Home',
            mahasiswa: mahasiswa,
            layout: 'layouts/main-layouts'
        });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Halaman About',
        layout: 'layouts/main-layouts'
    });
});

// Halaman Contact
app.get('/contact', (req, res) => {
    const contacts = loadContact();

    res.render('contact', {
        title: 'Halaman Contact',
        layout: 'layouts/main-layouts',
        contacts: contacts,
        msg: req.flash('msg'),
    });
});

// Halaman Tambah Contact
app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        title: 'Halaman Tambah Contact',
        layout: 'layouts/main-layouts',
    });
});

// Proses Contact Baru
app.post(
    '/contact',

    // Validasi Form Contact
    [
        body('nama').custom((value) => {
            const duplikat = cekDuplikat(value);
            if (duplikat) {
                throw new Error("Nama Contact Sudah Digunakan!");
            }
            return true;
        }),
        check('email', 'Email Tidak Valid!').isEmail(),
        check('nohp', 'No HP Tidak Valid!').isMobilePhone('id-ID'),
    ],

    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('add-contact', {
                title: 'Form Tambah Data Contact',
                layout: 'layouts/main-layouts',
                errors: errors.array()
            });
        } else {
            addContact(req.body);
            req.flash('msg', 'Data Contact Berhasil Ditambahkan!!');
            res.redirect('/contact');
        }
});

// Hapus Data Contact
app.get('/contact/delete/:nama', (req, res) => {
    const contact = findContact(req.params.nama);

    if (!contact) {
        res.status(404);
        res.send('<h1>404</h1>');
    } else {
        deleteContact(req.params.nama);
        req.flash('msg', 'Data Contact Berhasil DiHapus!!');
        res.redirect('/contact');
    }
});

// Halaman Edit Contact
app.get('/contact/edit/:nama', (req, res) => {
    const contact = findContact(req.params.nama)

    res.render('edit-contact', {
        title: 'Halaman Ubah Contact',
        layout: 'layouts/main-layouts',
        contact
    });
});

// Halaman proses update contact
app.post(
    '/contact/update',

    // Validasi Form Contact
    [
        body('nama').custom((value, { req }) => {
            const duplikat = cekDuplikat(value);
            if (value !== req.body.oldNama && duplikat) {
                throw new Error("Nama Contact Sudah Digunakan!");
            }
            return true;
        }),
        check('email', 'Email Tidak Valid!').isEmail(),
        check('nohp', 'No HP Tidak Valid!').isMobilePhone('id-ID'),
    ],

    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('edit-contact', {
                title: 'Form Ubah Data Contact',
                layout: 'layouts/main-layouts',
                errors: errors.array(),
                contact: req.body
            });
        } else {
            updateContacts(req.body);
            req.flash('msg', 'Data Contact Berhasil Diubah!!');
            res.redirect('/contact');
        }
});

// Halaman detail contact
app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama);

    res.render('detail', {
        title: 'Halaman Detail Contact',
        layout: 'layouts/main-layouts',
        contact
    });
});

app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404</h1>');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
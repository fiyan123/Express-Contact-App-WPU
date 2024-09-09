const express = require('express');
const mysql = require('mysql');
const expressLayouts = require('express-ejs-layouts');
const { body, validationResult, check } = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const app = express();
const port = 3000;

// Gunakan EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));

// Kirim Data url
app.use(express.urlencoded({ extended: true }));

// Koneksi Database
const db = mysql.createConnection({
    host: "localhost",
    database: "dbnodejs",
    user: "root",
    password: "",
});

db.connect((err) => {
    if (err) throw err;
    console.log("Database Connected...");
});

// Untuk get data
app.use(
    session({
        cookie: { maxAge: 6000 },
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);
app.use(flash());

// Halaman Home
app.get('/', (req, res) => {
    const mahasiswa = [
        { nama: 'Ian', email: 'ian@gmail.com' },
        { nama: 'Dani', email: 'dani@gmail.com' },
        { nama: 'Isma', email: 'isma@gmail.com' },
    ];

    res.render('index', {
        nama: 'ian',
        title: 'Halaman Home',
        mahasiswa: mahasiswa,
        layout: 'layouts/main-layouts',
    });
});

// Halaman About
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Halaman About',
        layout: 'layouts/main-layouts',
    });
});

// Halaman Contact
app.get('/contact', (req, res) => {
    db.query('SELECT * FROM contacts', (err, results) => {
        if (err) throw err;

        res.render('contact', {
            title: 'Halaman Contact',
            layout: 'layouts/main-layouts',
            contacts: results,
            msg: req.flash('msg'),
        });
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
    [
        body('nama').custom((value) => {
            return new Promise((resolve, reject) => {
                db.query('SELECT nama FROM contacts WHERE nama = ?', [value], (err, results) => {
                    if (err) throw err;
                    if (results.length > 0) {
                        reject(new Error('Nama Contact Sudah Digunakan!'));
                    }
                    resolve(true);
                });
            });
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
                errors: errors.array(),
            });
        } else {
            const { nama, email, nohp } = req.body;
            db.query('INSERT INTO contacts SET ?', { nama, email, nohp }, (err, result) => {
                if (err) throw err;
                req.flash('msg', 'Data Contact Berhasil Ditambahkan!!');
                res.redirect('/contact');
            });
        }
    }
);

// Hapus Data Contact
app.get('/contact/delete/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM contacts WHERE id = ?', [id], (err, result) => {
        if (err) {
            res.status(404).send('<h1>404</h1>');
        } else {
            req.flash('msg', 'Data Contact Berhasil Dihapus!!');
            res.redirect('/contact');
        }
    });
});

// Halaman Edit Contact
app.get('/contact/edit/:id', (req, res) => {
    const { id } = req.params;

    db.query('SELECT * FROM contacts WHERE id = ?', [id], (err, result) => {
        if (err) throw err;

        res.render('edit-contact', {
            title: 'Halaman Ubah Contact',
            layout: 'layouts/main-layouts',
            contact: result[0],
        });
    });
});

// Halaman proses update contact
app.post(
    '/contact/update',
    [
        body('nama').custom((value, { req }) => {
            return new Promise((resolve, reject) => {
                db.query('SELECT nama FROM contacts WHERE nama = ?', [value], (err, results) => {
                    if (err) throw err;
                    if (value !== req.body.oldNama && results.length > 0) {
                        reject(new Error('Nama Contact Sudah Digunakan!'));
                    }
                    resolve(true);
                });
            });
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
                contact: req.body,
            });
        } else {
            const { oldNama, nama, email, nohp } = req.body;
            db.query(
                'UPDATE contacts SET nama = ?, email = ?, nohp = ? WHERE nama = ?',
                [nama, email, nohp, oldNama],
                (err, result) => {
                    if (err) throw err;
                    req.flash('msg', 'Data Contact Berhasil Diubah!!');
                    res.redirect('/contact');
                }
            );
        }
    }
);

// Halaman detail contact
app.get('/contact/:id', (req, res) => {
    const { id } = req.params;

    db.query('SELECT * FROM contacts WHERE id = ?', [id], (err, result) => {
        if (err) throw err;

        res.render('detail', {
            title: 'Halaman Detail Contact',
            layout: 'layouts/main-layouts',
            contact: result[0],
        });
    });
});

// Handle 404
app.use('/', (req, res) => {
    res.status(404).send('<h1>404</h1>');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

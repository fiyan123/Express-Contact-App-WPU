const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const app = express()
const port = 3000

// Gunakan EJS
app.set('view engine', 'ejs');

// Third-party Middleware
app.use(expressLayouts);
app.use(morgan('dev'));

// built-in middleware
app.use(express.static('public'));

// middleware sederhana
app.use((req, res, next) => {
    console.log('Time : ', Date.now());
    next();
});

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

app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404</h1>');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
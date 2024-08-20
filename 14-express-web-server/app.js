const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.sendFile('./index.html', {root:__dirname});
})

app.get('/about', (req, res) => {
    res.sendFile('./about.html', {root:__dirname});
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// const fs = require('fs');
// const http = require('http');
// const port = 3000;

// const renderHTML = (path, res) => {
//     fs.readFile(path, (err, data) => {
//         if (err) {
//             res.writeHead(404);
//             res.write('Error: File Is Not Found');
//         } else {
//             res.write(data);
//         }
//         res.end();
//     });
// };

// http.createServer((req, res) => {
//     res.writeHead(200, {
//         'Content-Type': 'text/html',
//     });

//     const url = req.url;

//     switch (url) {
//         case '/about':
//             renderHTML('./about.html', res);
//         break;
//         default:
//             renderHTML('./index.html', res);
//         break;
//     }
// }).listen(port, () => {
//     console.log(`Server Is Listening In Port ${port}`);
// });
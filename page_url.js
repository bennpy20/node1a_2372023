var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var server = http.createServer((req, res) => {
    let q = url.parse(req.url, true);
    let pathname = q.pathname;

    // Mengambil extension filenya (.css , .js , dll)
    let extname = path.extname(pathname);

    // Mapping untuk tipe konten
    let contentTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        // '.gif': 'image/gif',
        // '.svg': 'image/svg+xml',
        // '.woff': 'font/woff',
        // '.woff2': 'font/woff2',
        // '.ttf': 'font/ttf',
        // '.eot': 'application/vnd.ms-fontobject',
        // '.otf': 'font/otf'
    };

    // Kalau diminta file css/js/gambar/font
    // Kalau ada ekstensi file, maka layani file statis
    if (extname) {
        const filePath = path.join(__dirname, pathname);
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                return res.end('File not found: ' + filePath);
            }
            res.writeHead(200, { 'Content-Type': contentTypes[extname] || 'application/octet-stream' });
            res.end(data);
        });
        return;
    }


    // Kalau diminta HTML
    let menu = q.query.menu;
    let fileLocation = 'login/index.html';

    // if (menu === '/') {
    //     fileLocation = 'login/index.html';
    // }

    switch (menu) {
        case '/':
            fileLocation = 'login/index.html';
            break;
        case 'dashboard':
            fileLocation = 'content/admin/dashboard.html';
            break;
        case 'mahasiswa':
            fileLocation = 'content/admin/mahasiswa.html';
            break;
        case 'dosen':
            fileLocation = 'content/admin/dosen.html';
            break;
        case 'mahasiswa_add':
            fileLocation = 'content/admin/mahasiswa_add.html';
            break;
        case 'dosen_add':
            fileLocation = 'content/admin/dosen_add.html';
            break;
        case 'dsn-dashboard':
            fileLocation = 'content/dosen/dashboard.html';
            break;
        case 'dsn-mahasiswa':
            fileLocation = 'content/dosen/mahasiswa.html';
            break;
        case 'dsn-mahasiswa_add':
            fileLocation = 'content/dosen/mahasiswa_add.html';
            break;
        case 'mhs-dashboard':
            fileLocation = 'content/mahasiswa/dashboard.html';
            break;
        default:
            fileLocation = 'login/index.html'; // fallback
    }

    fs.readFile(fileLocation, (err, data) => {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end('404 Not Found');
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
});

server.listen(8000, () => {
    console.log('http://localhost:8000');
});
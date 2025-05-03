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
    if (extname) {
        fs.readFile('.' + pathname, (err, data) => {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/plain'});
                return res.end('File not found');
            }
            res.writeHead(200, {'Content-Type': contentTypes[extname] || 'application/octet-stream'});
            res.write(data);
            return res.end();
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
        case 'dashboard':
            fileLocation = 'content/examples/dashboard.html';
            break;
        case 'mahasiswa':
            fileLocation = 'content/examples/mahasiswa.html';
            break;
        case 'user':
            fileLocation = 'content/examples/user.html';
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
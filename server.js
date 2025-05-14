
const http = require('http');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const { saveUser } = require('./user');

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/") {
        const filePath = path.join(__dirname, 'loginpage.html');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end("Error loading HTML");
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    }

    else if (req.method === "GET" && req.url === "/loginpage.css") {
        const cssPath = path.join(__dirname, 'loginpage.css');
        fs.readFile(cssPath, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end("CSS file not found");
            } else {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(data);
            }
        });
    }

    else if (req.method === "GET" && req.url === "/collegephoto.jpg") {
        const imgPath = path.join(__dirname, 'collegephoto.jpg');
        fs.readFile(imgPath, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end("Image not found");
            } else {
                res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                res.end(data);
            }
        });
    }

    else if (req.method === "POST" && req.url === "/login") {
        let body = "";
        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", async () => {
            const formData = qs.parse(body);
            console.log("Received:", formData);

            try {
                await saveUser(formData);
                res.writeHead(302, { Location: "/" });
                res.end();
            } catch (err) {
                res.writeHead(500);
                res.end("Error saving to database: " + err.message);
            }
        });
    }

    else {
        res.writeHead(404);
        res.end("404 Not Found");
    }
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});

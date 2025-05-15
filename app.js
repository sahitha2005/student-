const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');
const mongoose = require('mongoose');
require('./db');
const Student = require('./models/studentModel');

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'GET') {
    let filePath = path.join(__dirname, 'public', parsedUrl.pathname === '/' ? 'index.html' : parsedUrl.pathname);
    const ext = path.extname(filePath);
    const mime = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript'
    };

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(404);
        res.end('File not found');
      } else {
        res.writeHead(200, { 'Content-Type': mime[ext] || 'text/plain' });
        res.end(content);
      }
    });

  } else if (req.method === 'POST' && parsedUrl.pathname === '/register') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', async () => {
      const data = JSON.parse(body);
      try {
        const student = new Student(data);
        await student.save();
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Student Registered Successfully!');
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        if (err.code === 11000) {
          res.end('Register Number already exists!');
        } else {
          res.end('Registration Failed!');
        }
      }
    });

  } else if (req.method === 'POST' && parsedUrl.pathname === '/login') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', async () => {
      const data = JSON.parse(body);
      try {
        const student = await Student.findOne({ registerNumber: data.registerNumber });
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        if (student) {
          res.end(`Welcome, ${student.name}!`);
        } else {
          res.end('Invalid Register Number');
        }
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Login Failed!');
      }
    });
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});

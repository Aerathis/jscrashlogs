'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const https = require('https');



var keyPath = process.argv[2];
var certPath = process.argv[3];
var logPath = process.argv[4];

let app = express();
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
});
app.use(bodyParser.json())

app.post('*', function (req, res) {
  let body = req.body;
  console.log(body);
  fs.appendFile(logPath, JSON.stringify(body) + '\n', (err) => {
    if (err) throw err;
    res.send(200);
  });
});

const credentials = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath)
};


let server = https.createServer(credentials, app)

server.listen(8888);
console.log('server listening');

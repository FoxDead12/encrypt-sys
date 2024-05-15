const express = require('express');
const path = require('path')
const app = express();
const port = 3001;

// IMPORTS TO METHODS
const crypto = require('crypto');
const cryptoJS = require('crypto-js');
const nodeRsa = require('node-rsa');

app.listen(port, () => {
  console.log(`Example app listening on 127.0.0.1:${port}`);
})

app.use(express.static(path.join(__dirname, '../dist/')))
app.use(express.json())

// Define the allowed origins
const allowedOrigins = ['http://localhost:3001', 'http://localhost:5173', 'https://encrypt-sys.coexy.net'];

// Middleware to set CORS headers
app.use((req, res, next) => {
  const origin = req.headers.origin;
  // Check if the origin is in the allowedOrigins array or if it's undefined (allowing requests with no origin, like from a file:// URL)
  if (allowedOrigins.includes(origin) || !origin) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }
  next();
});

// ROUTES;

// Hash
app.post('/hash', (req, res) => {

  const body = req.body;

  if (!body || !body?.data) { return res.sendStatus(400) }

  const hash = crypto.createHash('sha256');
  hash.update(body.data);

  res.send(hash.digest('hex'));

});

// Hash width Salt
app.post('/salt', (req, res) => {
  const body = req.body;

  if (!body || !body?.data) { return res.sendStatus(400) }

  let salt;

  if (body?.salt) {
    salt = body.salt
  } else {
    salt = crypto.randomBytes(32).toString('hex');
  }

  const hash = crypto.createHash('sha256');
  hash.update(body.data + salt);

  res.send(JSON.stringify({ hash: hash.digest('hex'), salt: salt }));
});

// SYMMETRIC ENCRYPT //
app.post('/sy-encrypt', (req, res) => {
  const body = req.body;

  if (!body || !body?.data) { return res.sendStatus(400) }

  let secret;

  if (body?.secret) {
    secret = body.secret
  } else {
    secret = crypto.randomBytes(32).toString('hex');
  }

  const data = cryptoJS.AES.encrypt(body.data, secret).toString();

  res.send(JSON.stringify({ data: data, secret }));
});

app.post('/sy-decrypt', (req, res) => {
  const body = req.body;

  if (!body || !body?.data || !body?.secret) { return res.sendStatus(400) }

  const data = cryptoJS.AES.decrypt(body.data, body.secret).toString(cryptoJS.enc.Utf8);

  res.send(JSON.stringify({ data: data }));
});

var key = new nodeRsa().generateKeyPair();

app.post('/asy-encrypt', (req, res) => {

  const body = req.body;

  if (!body || !body?.data) { return res.sendStatus(400) }

  const data = key.encryptPrivate(body.data, 'base64');

  res.send(JSON.stringify({ data: data }));

})

app.post('/asy-decrypt', (req, res) => {
  const body = req.body;

  if (!body || !body?.data) { return res.sendStatus(400) }

  const data = key.decryptPublic(body.data, 'utf8');

  res.send(JSON.stringify({ data: data }));
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

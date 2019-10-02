// app.js

const http = require('http');
const express = require('express');

const app = express();
app.get('/', (req, res) => {
    res.send("hello quốc")
})
// Start the server on port 3000
app.listen(8080, '127.0.0.1');
console.log('Node server running on port 8080');
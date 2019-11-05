const express = require('express');
const logger = require('morgan');
const users = require('./routes/users');
const gitRouters = require('./routes/github-proxy');
const bodyParser = require('body-parser');
const mongoose = require('../config/database');
var jwt = require('jsonwebtoken');
const cors = require('cors');
const Pusher = require('pusher');
const axios = require('axios');
const app = express();

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('secretKey', 'nodeRestApi');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

//my route
app.get('/', function (req, res) {
  res.json({ message: "Welcome to WDP" });
});

app.use('/users', users);
app.use('/git', gitRouters);


app.set('port', process.env.PORT || 8080);
const server = app.listen(app.get('port'),"0.0.0.0", () => {
  console.log(`Express running → PORT ${server.address().port}`);
});



function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
    if (err) {
      res.json({ status: "error", message: err.message, data: null });
    } else {
      req.body.userId = decoded.id;
      next();
    }
  });

}

// require('dotenv').config({ path: '.env' });
const express = require('express');
const logger = require('morgan');
const users = require('./routes/users');
const bodyParser = require('body-parser');
const mongoose = require('./config/database');
var jwt = require('jsonwebtoken');
const cors = require('cors');
const Pusher = require('pusher');
const axios = require('axios');

const app = express();

const baseURL = "https://api.github.com";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true,
});
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('secretKey', 'nodeRestApi');

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.json({ message: "Welcome to WDP" });
});

// public route
app.use('/users', users);

app.get('/git/getuserinfo', function (req, res) {
  let uid = req.body.uid;
  let mydata;
  axios.get(baseURL + "/user/" + uid).then((res1) => {
    mydata = res1.data;
    res.send({ info: mydata })
  });
})

app.get('/git/getuserrepos', function (req, res) {
  let login = req.body.login;
  let respos = [];
  axios.get(baseURL + "/users/" + login + "/repos").then((res1) => {
    let repositories = res1.data;
    repositories.map((item) => {
      let repo = {
        name: null,
        html_url: null
      }
      repo.name = item.name;
      repo.html_url = item.html_url;
      respos.push(repo);
    });
    res.status(200).send({ repositories : respos});
  });
});


app.post('/git/listfile', function(req, res){
    let owner = req.body.login;
    let repo = req.body.repo;
    axios.get(baseURL + "/repos/" + owner + "/" + repo + "/commits").then((res1) => {
        let lastCommit = res1.data[0];
        let sha = lastCommit.sha;
        axios.get(baseURL + "/repos/" + owner + "/" + repo + "/git/trees/" + sha + "?recursive=1").then((res2) => {
          let fileTree = res2.data;
          res.send({filetree : fileTree});
        });
    });
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


app.use(function (err, req, res, next) {
  console.log(err);

  if (err.status === 404)
    res.status(404).json({ message: "Not found" });
  else
    res.status(500).json({ message: "Something looks wrong :( !!!" });

});

// app.post('/update-editor', (req, res) => {
//   pusher.trigger('editor', 'text-update', {
//     ...req.body,
//   });
//   res.status(200).send('OK');
// });

app.set('port', process.env.PORT || 8080);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

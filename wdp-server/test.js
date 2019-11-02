const express = require("express");
const route = express.Router;
const axios = require("axios");
const fs = require('fs');
const baseURL = "https://api.github.com";

let owner = "ThiinhUET";
let repo = "WDP-project";
axios.get(baseURL + "/repos/" + owner + "/" + repo + "/commits").then((res1) => {
    let lastCommit = res1.data[0];
    let sha = lastCommit.sha;
    axios.get(baseURL + "/repos/" + owner + "/" + repo + "/git/trees/" + sha + "?recursive=1").then((res2) => {
      let fileTree = res2.data;
        console.log(fileTree);   
    });
});



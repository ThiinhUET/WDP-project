const express = require("express");
const route = express.Router;
const axios = require("axios");

const baseURL = "https://api.github.com";

let user = "ThiinhUET"

axios.get(baseURL+"/users/"+user +"/repos").then(
    res => {
        console.log(tyo);      
    }
)

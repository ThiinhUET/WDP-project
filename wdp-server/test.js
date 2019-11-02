const express = require("express");
const route = express.Router;
const axios = require("axios");
const fs = require('fs');
const baseURL = "https://api.github.com";

let uid = "34747967";
let userInfo = null;
let respos = [];
let repo ={
    name : null,
    avataURL : null
}
axios.get(baseURL + "/user/" + uid).then((res) =>{
    userInfo =  res.data;       
    
    let user = userInfo.login;
    
    axios.get(baseURL+"/users/"+ user +"/repos").then(
        (res) => {
            let data = res.data;
            console.log(data[0].name);
            
            
            })
    
});



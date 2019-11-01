const express = require("express");
const route = express.Router;
const axios = require("axios");
const fs = require('fs');
const baseURL = "https://api.github.com";

let uid = "34747967";
let userInfo = null;
axios.get(baseURL + "/user/" + uid).then((res) =>{
    // userInfo =  res.data;
    console.log(res.data);
    
});



// let respos = [];
// let user = userInfo.login;
// console.log(user);

// axios.get(baseURL+"/users/"+ user +"/repos").then(
//     (res) => {
//         let data = res.data;
//         let respo = {
//             name : null,
//             url : null
//         }

//         data.map((item) =>{

//         })
//     }
// )

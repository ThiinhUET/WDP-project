var axios = require('axios');

let data;

axios.post('http://localhost:8080/git/getuserinfo', 
    {
        uid : 34747967
    }
).then(res => {
    data = res.data;
    console.log(data);
}).catch(err => {
    console.log(err);
});





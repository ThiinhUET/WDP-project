const axios = require('axios');

axios.put('https://api.github.com/repos/ThiinhUET/TestWDP/contents/index.html',{
    "message": "aaaaaa",
    "committer": {
        "name": "Lê Văn Thịnh",
        "email": "thinhlevan2015@gmail.com"
      },
    "content": "YWFhYWFhYQ==",
    "sha" : "a2a450a1534d2ddb6f35647f27e5c497d9ce8b93"
}, {headers : {"Authorization" : "token db5c63c296dfa9095d6dd27da90c55a217d44796"}}).then(res => {
    console.log(res.data)
}).catch(err => {
    console.log(err.message);
})
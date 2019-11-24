const axios = require('axios');

axios.put('https://api.github.com/repos/ThiinhUET/TestWDP/contents/index.html',{
    "message": "dmmmmm",
    "committer": {
        "name": "Lê Văn Thịnh",
        "email": "thinhlevan2015@gmail.com"
      },
    "content": "aGVsbG9vb28=",
    "sha" : "e473a654fdead842c7c01e326ef23315b1defd0c"
}, {headers : {"Authorization" : "token d3d7567964eedf990b1bd03f47a04362c5552118"}}).then(res => {
    console.log(res.data)
}).catch(err => {
    console.log(err.message);
})
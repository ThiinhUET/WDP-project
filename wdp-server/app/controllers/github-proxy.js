const axios = require('axios');
const baseURL = "https://api.github.com";
const convertTree = require('../../convertString');


module.exports = {
    getUserInfo: function (req, res) {
        let uid = req.body.uid;
        let accessToken = req.body.accessToken;
        let mydata;
        axios.get(baseURL + "/user/" + uid, { headers: { Authorization: 'token ' + accessToken } }).then((res1) => {
            mydata = res1.data;
            res.send({ info: mydata });
        });
    },

    getUserRepos: function (req, res) {
        let login = req.body.login;
        let accessToken = req.body.accessToken;
        let respos = [];
        axios.get(baseURL + "/users/" + login + "/repos", { headers: { Authorization: 'token ' + accessToken } }).then((res1) => {
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
            res.status(200).send({ repositories: respos });
        });
    },

    getListFile: function (req, res) {
        let owner = req.body.login;
        let repo = req.body.repo;
        let accessToken = req.body.accessToken;
        axios.get(baseURL + "/repos/" + owner + "/" + repo + "/commits", { headers: { Authorization: 'token ' + accessToken } }).then((res1) => {
            let lastCommit = res1.data[0];
            let sha = lastCommit.sha;
            axios.get(baseURL + "/repos/" + owner + "/" + repo + "/git/trees/" + sha + "?recursive=1").then((res2) => {
                let fileTree = convertTree(res2.data);              
                res.send({ filetree: fileTree });
            });
        });
    },

    getFileContent: function(req, res){
        let content = req.body.content;
        let accessToken = req.body.accessToken;
        axios.get(content, {headers : {Authorization : 'token ' + accessToken}}).then(gitResponse => {
            let data = gitResponse.data.content;
            let encoding = gitResponse.data.encoding;
            let decodedData = Buffer.from(data, encoding).toString();
            res.send({content : decodedData, encoding : encoding});
        }).catch(err => {
            console.log("Just ignore this", err.status);
        });
    }
}
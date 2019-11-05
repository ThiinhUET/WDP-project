const axios = require('axios');
const baseURL = "https://api.github.com";

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
                let fileTree = res2.data;
                res.send({ filetree: fileTree });
            });
        });
    }
}
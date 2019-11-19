const express = require('express');
const router = express.Router();
const gitController = require('../controllers/github-proxy');

module.exports = router;

router.post('/user-info', gitController.getUserInfo);
router.post('/user-repos',gitController.getUserRepos);
router.post('/user-listfile', gitController.getListFile);
router.post('/get-file-content', gitController.getFileContent); 

const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');


router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);
router.post('/update', userController.update);
// router.get('/git/userinfo', userController.getUserInfo);
module.exports = router;
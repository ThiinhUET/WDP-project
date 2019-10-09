const userModel = require('../models/users');
const bcrypt = require('bcrypt');	
const jwt = require('jsonwebtoken');				

module.exports = {
	create: function(req, res, next) {
		
		userModel.create({ username: req.body.username, email: req.body.email, password: req.body.password, fullname: req.body.fullname}, function (err, result) {
				  if (err) 
				  	next(err);
				  else
				  	res.json({status: "success", message: "Them user thanh cong", data: null});
				  
				});
	},

	authenticate: function(req, res, next) {
		userModel.findOne({username:req.body.username}, function(err, userInfo){
					if (err) {
						next(err);
					} else {

						if(userInfo != null && bcrypt.compareSync(req.body.password, userInfo.password)) {

						 const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' }); 

						 res.json({status:"success", message: "user founded!", data:{user: userInfo, token:token}});	

						}else{

							res.json({status:"error", message: "Invalid username/password!!!", data:null});

						}
					}
				});
	},

}					

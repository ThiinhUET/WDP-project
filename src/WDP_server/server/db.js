var mongoose = require('mongoose');

var user_schema = new mongoose.Schema({
    username: 'string',
    password: 'string' 
});

var User = mongoose.model('User', user_schema);

var test_user = new User({
    username: 'thinh dep trai',
    password: '123456' 
});


User.create({ 
    username: test_user.username, 
    password: test_user.password 
}, function (err) {
  if (err) return handleError(err);
});

mongoose.connect('mongodb://localhost/WDP', {useNewUrlParser: true});



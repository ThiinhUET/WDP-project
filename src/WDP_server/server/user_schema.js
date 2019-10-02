var mongoose = require('mongoose');

var shema = mongoose.Schema;

var userSchema = new Schema({
    Username: String,
    Password : String
});

var user = mongoose.model('user', userSchema);

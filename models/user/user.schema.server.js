var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phoneNo: String,
    address: String
}, {collection: 'user'});

module.exports = userSchema;

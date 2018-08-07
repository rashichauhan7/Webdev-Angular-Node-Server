var mongoose = require('mongoose');
var userSchema  = require('./user.schema.server');

var userModel = mongoose.model('UserModel', userSchema);

function findUserByUsername(user) {
    return userModel.findOne({username: user.username});
}

function createUser(user)
{
    return userModel.create(user);
}

function findAllUsers() {
    return userModel.find();
}

function login(user) {
    return userModel.findOne({username: user.username, password: user.password});
}

function register(user) {
    return userModel.create(user);
}

function updateUser(user) {

    return userModel.findOneAndUpdate({_id: user._id},{
        $set: user
    });
}

function findUserById(userId)
{
    return userModel.findById(userId);
}


function findUserByIdExpanded(userId) {
    return userModel.findById(userId)
        .populate('sections')
        .exec();
}

var api = {
  createUser: createUser,
    findAllUsers: findAllUsers,
    login: login,
    findUserByIdExpanded: findUserByIdExpanded,
    findUserById: findUserById,
    register: register,
    updateUser: updateUser,
    findUserByUsername: findUserByUsername
};

module.exports = api;



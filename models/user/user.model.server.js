var mongoose = require('mongoose');
var userSchema  = require('./user.schema.server');

var userModel = mongoose.model('UserModel', userSchema);


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
    var query = {'username':user.username};

     return userModel.findOneAndUpdate(query, user, {upsert:true},
        function(err, doc) {
            if (err)
                console.log(err);
            return "succesfully saved";
        }
    );
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
    updateUser: updateUser
};

module.exports = api;



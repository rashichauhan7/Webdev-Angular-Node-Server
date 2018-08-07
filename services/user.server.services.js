
module.exports = function (app) {
    app.get('/api/user', findAllUsers)
    app.post('/api/user', findUserByUsername);
    app.post('/api/login', login);
    app.get('/api/logout', logout);
    app.get ('/api/currentUser', currentUser);
    app.post('/api/register', createUser);
    app.post('/api/profile', updateUser);

    var userModel = require("../models/user/user.model.server");

    function currentUser(req, res) {
        const currentUser = req.session['currentUser'];
        if(currentUser) {
            userModel.findUserByIdExpanded(currentUser._id)
                .then(user => res.send(user))
        } else {
            res.send({msg:"Forbidden"});
        }
    }


    function findUserByUsername(req, res) {
        userModel.findUserByUsername(req.body)
            .then(user => {
                if(user)
                    res.send(user);
                else
                    res.send({msg:"User not found"}) })
    }
    function createUser(req,res) {
        userModel.createUser(req.body)
            .then(function (user) {
                req.session['currentUser']  = user;
                res.send(req.session['currentUser'])
            })

    }

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(function (users) {
                res.send(users);
            })
    }

    function login(req, res) {
        userModel.login(req.body)
            .then(function (user) {
                if(user !== null) {
                    req.session['currentUser'] = user;
                    res.send(req.session['currentUser']);
                }
                else{
                    user = {"user": 'Not found'};
                    res.send(JSON.stringify(user));
                }

            })
    }

    function logout(req, res) {

        req.session.destroy();
        req.sessionStore.destroy();
        res.send(200);
    }

    function updateUser(req, res){
        userModel.updateUser(req.body)
            .then((response) =>
            {
                res.send({msg: response});
            })
    }
}


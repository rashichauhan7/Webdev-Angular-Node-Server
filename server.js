var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
const mongoose = require('mongoose');
mongoose.connect('mongodb://angular-node-server-db:1234abcd5678@ds031711.mlab.com:31711/heroku_10j4c4gx');
var app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", 'PUT, POST, GET, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));

app.get('/', function(req, res) {
    res.send('Hello World!')
});


var userService  = require('./services/user.server.services');
userService(app);
var schemaService = require('./services/section.server.services');
schemaService(app);
app.listen(process.env.PORT || 4000)
// app.listen(4000);

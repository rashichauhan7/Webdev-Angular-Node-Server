var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var session = require('express-session');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webdev-angular-db');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", 'PUT, POST, GET, DELETE, OPTIONS');
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

app.get('/api/session/set/:name/:value',
    setSession);
 app.get('/api/session/get/:name',
         getSession);

function setSession(req, res) {
    var name = req.params['name'];
    var value = req.params['value'];
    req.session[name] = value;
    res.send(req.session);
}

function getSession(req, res) {
    var name = req.params['name'];
    var value = req.session[name];
    res.send(value);
}

var userService  = require('./services/user.server.services');
userService(app);
var schemaService = require('./services/section.server.services');
schemaService(app);
app.listen(4000);

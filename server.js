'use strict';

const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const quickthumb = require('quickthumb');
const session = require('express-session');

const MongoStore = require('connect-mongo')(session);

const app = express();
app.set('port', (process.env.PORT || 5000));
require('dotenv').load();

// webpackHotMiddleware
if (process.env.NODE_ENV !== 'production') {
    require('./server/config/webpackHotMiddleware')(app);
}

// passport config
require('./server/config/passport')(passport);

// mongoose
mongoose.connect('mongodb://localhost:27017/vrazreze');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(quickthumb.static(process.cwd() + '/public'));

// inject routes
require('./server/routes')(app);

// Should be placed at the very end for the rest 'get' requests to work
app.get('*', function(req, res) {
    res.sendFile(process.cwd() + '/public/index.html');
});

app.listen(app.get('port'), function () {
    console.log("Express server running at http://localhost:" + app.get('port'));
    console.log("NODE_ENV=" + process.env.NODE_ENV);
});

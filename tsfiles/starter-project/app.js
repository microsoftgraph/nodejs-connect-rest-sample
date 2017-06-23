"use strict";
/*
 * Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
// application dependencies
var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var passport = require('passport');
var OIDCStrategy = require('passport-azure-ad').OIDCStrategy;
var uuid = require('uuid');
var config = require('./utils/config.js');
var app = express();
// **IMPORTANT
// Note that production apps will need to create a self-signed cert and use a secure server,
// and change dev settings marked 'For development only' in app.js and config.js.
// Below is an example after you have the key cert pair:
// const https = require('https');
// const certConfig = {
//  key: fs.readFileSync('./utils/cert/server.key', 'utf8'),
//  cert: fs.readFileSync('./utils/cert/server.crt', 'utf8')
// };
// const server = https.createServer(certConfig, app);
// authentication setup
var callback = function (iss, sub, profile, accessToken, refreshToken, done) {
    done(null, {
        profile: profile,
        accessToken: accessToken,
        refreshToken: refreshToken
    });
};
passport.use(new OIDCStrategy(config.creds, callback));
var users = {};
passport.serializeUser(function (user, done) {
    var id = uuid.v4();
    users[id] = user;
    done(null, id);
});
passport.deserializeUser(function (id, done) {
    var user = users[id];
    done(null, user);
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// session middleware configuration
// see https://github.com/expressjs/session
app.use(session({
    secret: '12345QWERTY-SECRET',
    name: 'graphNodeCookie',
    resave: false,
    saveUninitialized: false,
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);
// error handlers
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    res.status(404);
    next(err);
});
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
module.exports = app;

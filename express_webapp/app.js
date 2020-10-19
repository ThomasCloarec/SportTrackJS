var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var busboy = require('connect-busboy'); //middleware for form/file upload
var fs = require('fs-extra');       //File System - for file manipulation

// routes requirements
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var connectRouter = require('./routes/connect');
var activitiesRouter = require('./routes/activities');
var modifyRouter = require('./routes/modify');
var adminRouter = require('./routes/admin');

// app instanciation
var app = express();

app.use(busboy())

// session
app.use(session({
    secret: 'mysecret',
    cookie: {secure: false},
    resave: true,
    saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/connect', connectRouter);
app.use('/activities', activitiesRouter);
app.use('/modify', modifyRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    req.session.error = "404 : Page introuvable.";
    req.session.return = "/";

    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);

    if (err.status === 404)
        res.render('error', {
            err: req.session.error,
            ret: req.session.return
        });
});

module.exports = app;

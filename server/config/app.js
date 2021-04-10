// installed 3rd party package
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let passport = require('passport');
let session = require('express-session');
let flash = require('express-flash');

//passport config
require("../config/passport")(passport);

// app instantiation
let app = express();

// databse setup
let mongoose = require('mongoose');
let DB = require('./db');

// point mongoose to the DB RUI
mongoose.connect(DB.URI, { useNewUrlParser: true, useUnifiedTopology: true });

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error'));
mongoDB.once('open', () => {
  console.log('Connected to MongoDB...');
});


app.use(flash());

// Express session
app.use(session({
  secret: "secret",
  resave: true,
  saveUinitialized: true,
})
);


//initializepassport
app.use(passport.initialize());
app.use(passport.session());

//check authentication
app.use(function (req, res, next) {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

// router setup
let homeRouter = require('../routes/home');
let usersRouter = require('../routes/users');
let authRouter = require('../config/authentication');

app.use('/', homeRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

module.exports = app;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const mongoose = require('mongoose');
const { db } = require('./config/database');
const todoRouter = require('./routes/todo');
const movieRouter = require('./routes/movies');
const reviewRouter = require('./routes/reviews');
const publicMoveRouter = require('./routes/moviesForPublic');
const auth = require('./middleware/auth');
const cors = require('cors');



var app = express();


const reqTime = (req, res, next) => {
  req.reqTime = new Date().toLocaleTimeString()
  next();
}

mongoose.connect(db)
    .then(() => console.log('MongoDb is connected.'))
    .catch(err => console.log('Error ', err))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// middleware
app.use(reqTime);
// routes
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}))
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/todos', todoRouter);
app.use('/api/movies', auth.verifyUserToken, movieRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/public', publicMoveRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

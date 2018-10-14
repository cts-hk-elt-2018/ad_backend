var express = require('express');
var compression = require('compression');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

require('dotenv-safe').config();

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
// var io = require('socket.io').listen(server)


// Middleware
app.use(function(req, res, next){
  res.io = io;
  next();
});

app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Router
app.use('/', indexRouter);
app.use('/users', usersRouter);

// io.on('connection', function(socket) {
//     console.log('a user connected');
// });

module.exports = {app: app, server: server};

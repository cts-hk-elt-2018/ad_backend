import express from 'express';
import compression from 'compression';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import socket from 'socket.io';
import http from 'http';
import passportManager from './config/passport';
import router from './routes';

const Sentry = require('@sentry/node');


const app = express();

const server = http.Server(app);
const io = socket(server);
const screen = io.of('/screen');

Sentry.init({ dsn: 'https://fe9b409c3cf948dabe47139d387bfb54@sentry.io/1318831' });

// Middleware
app.use(Sentry.Handlers.requestHandler());

 
app.use(function(req, res, next){
  res.io = io;
  res.screen = screen;
  next();
});

app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));


app.use('/',router);

app.use(passportManager.initialize());

app.use(Sentry.Handlers.errorHandler());

io.on('connection', (socket) => {
  console.log('a user connected');
});
screen.on('connection', (socket) => {
  console.log('screen connected');
});


export {app, server};

const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
var session = require('express-session');
const logger = require('morgan');
const cors = require('cors');
const uuid = require('uuid').v4;

const db = require("./models");
db.sequelize.sync();

const app = express();

app.use(logger('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
const secret = uuid();
app.use(cookieParser(secret));
app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: false,
}))

const auth = require('./auth');

const dataApi = require('./routes/api/data');
const profileApi = require('./routes/api/profile');
const sessionsApi = require('./routes/api/sessions');

app.post('/api/sessions', sessionsApi.post);

app.get('/', (_, res) => {
  res.status(200).send('all good')
});
app.get('/api/data', auth, dataApi.get);
app.post('/api/data', auth, dataApi.post);
app.get('/api/profile', auth, profileApi.get);
app.put('/api/profile', auth, profileApi.put);
app.post('/api/profile', profileApi.post);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

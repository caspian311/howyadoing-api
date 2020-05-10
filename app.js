const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
var session = require('express-session');
const logger = require('morgan');
const cors = require('cors');

const db = require("./models");
db.sequelize.sync();

const apiRoutes = require('./routes/api');

const app = express();

app.use(logger('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(session({
  secret: 'supersecret'
}))

const auth = require('./auth');

app.use(auth);

app.use('/api', apiRoutes);

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

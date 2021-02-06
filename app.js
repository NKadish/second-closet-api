const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');

const customersRouter = require('./routes/customers');
const generalFeeRouter = require('./routes/generalFees');
const pricingRouter = require('./routes/pricing');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const db = require('./dataBase');
const dbHelpers = require('./helperFunctions/dbHelpers.js')(db);

app.use('/customers', customersRouter(dbHelpers));
app.use('/generalFees', generalFeeRouter(dbHelpers));
app.use('/pricing', pricingRouter(dbHelpers));

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
  res.send('error');
});

module.exports = app;

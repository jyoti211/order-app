// npm packages
const bodyParser = require('body-parser');
const express = require('express');

// app imports
const {
    connectToDatabase,
    globalResponseHeaders
} = require('./config');

const {
    errorHandler
} = require('./handlers');

const {
    ordersRouter
} = require('./routers');

const {
    bodyParserHandler,
    globalErrorHandler,
    notFoundHandler,
    methodNotAllowedHandler
} = errorHandler;

const app = express();

connectToDatabase();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParserHandler);

// response headers setup; CORS
app.use(globalResponseHeaders);

//  orders list request
app.use('/orders', ordersRouter);
// catch-all for 404 "Not Found" errors
app.get('*', notFoundHandler);
// catch-all for 405 "Method Not Allowed" errors
app.all('*', methodNotAllowedHandler);

app.use(globalErrorHandler);

/**
 * This file does NOT run the app. It merely builds and configures it then exports it.config
 *  This is for integration tests with supertest (see __tests__).
 */
module.exports = app;

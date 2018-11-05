// npm packages
const bodyParser = require('body-parser');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

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

 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


connectToDatabase();
app.use(function(err, req, res, next){
	if(res.headerSent){
		return next(err);
	}
	return res.status(err.status||HTTP_SERVER_ERROR).render(500);
});

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

module.exports = app;

const {
    APP_NAME
} = require('../config');

const {
    APIError
} = require('../helpers');

function bodyParserHandler(error, request, response, next) {
    if (error instanceof SyntaxError || error instanceof TypeError) {
      return next(new APIError(400, 'Malformed JSON.'));
    }
}

function notFoundHandler(request, response, next) {
    return next(
        new APIError(
            404,
            `${request.path} is not valid path to a ${APP_NAME} resource.`
        )
    );
}

function methodNotAllowedHandler(request, response, next) {
    return next(
        new APIError(
            405,
            `${request.method} method is not supported at ${request.path}.`
        )
    );
}

function globalErrorHandler(error, request, response, next) {
    let err = error;
    if (!(error instanceof APIError)) {
        err = new APIError(500, error.message);
    }
    
    return response.status(err.status).json(err);
}

module.exports = {
    bodyParserHandler,
    notFoundHandler,
    methodNotAllowedHandler,
    globalErrorHandler
};

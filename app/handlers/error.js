const {
    APP_NAME
} = require('../config');

const {
    APIError
} = require('../helpers');

function sendJsonResponse(statusCode, statusMessage){
    apiObj = new APIError(
                statusCode,
                statusMessage
           );
        jsonResponse = apiObj.toJSON();
    return jsonResponse;
}

function bodyParserHandler(error, request, response, next) {
    if (error instanceof SyntaxError || error instanceof TypeError) {
      return next(response.status(400).send(
        sendJsonResponse(400, 'Malformed JSON.')));
    }
}

function notFoundHandler(request, response, next) {
    return next(response.status(404).send(
        sendJsonResponse(404,
            `${request.path} is not valid path to a ${APP_NAME} resource.`)));
}

function methodNotAllowedHandler(request, response, next) {
    return response.status(405).send(
        sendJsonResponse(
            405,
            `${request.method} method is not supported at ${request.path}.`
        )
    );
}

function globalErrorHandler(error, request, response) {
    let err = error;
    if (!(error instanceof APIError)) {
        err = new APIError(err.status, error.message);
    }
    
    return response.status(err.status).json(err);
}

module.exports = {
    bodyParserHandler,
    notFoundHandler,
    methodNotAllowedHandler,
    globalErrorHandler,
    sendJsonResponse
};

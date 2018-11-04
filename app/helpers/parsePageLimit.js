const APIError = require('./APIError');

function getApiErrorResponse(statusCode, errorMessage, response){
    apiObj =  new APIError(statusCode, errorMessage);
    jsonResponse = apiObj.toJSON();

    return response.status(500).send(jsonResponse);
}

exports.parsePageLimitValue = function parsePageLimitValue(val, type, response) {
    if(!val){
        getApiErrorResponse(500,
            `Either of Page or limit Number is missing.`,
            response);
    }
    const num = +val;
    const min = 1;

    if (!Number.isInteger(num)) {
        getApiErrorResponse(500,
            `Invalid ${type}: '${val}', ${type} needs to be an integer.`,
            response);
    } else if (num < min) {
        getApiErrorResponse(500,
            `Number should be equal or greater than ${min}.`,
            response);
    }

    return num;
}

exports.checkPageAndLimitValue = function checkPageAndLimitValue(val, response){
    if(!val){
        apiObj =  new APIError(500, `Either of Page or limit Number is missing.`);
        jsonResponse = apiObj.toJSON();

        return response.status(500).send(jsonResponse);
    } 
    return true;
}

exports.checkNumberOfOrders = function checkNumberOfOrders(ordersList){
  return ordersList.length;
}

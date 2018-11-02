const APIError = require('./APIError');

exports.parsePageLimitValue = function parsePageLimitValue(val, type = 'limit') {
    if (!val) {
        return null;
    }
    const num = +val;
    const min = 1;

    if (!Number.isInteger(num)) {
        return new APIError(
            500,
            `Invalid ${type}: '${val}', ${type} needs to be an integer.`
        );
    } else if (num < min) {
          return new APIError(
              500,
              `number should be equal or greater than ${min}`
          );
    }

    return num;
}

exports.checkPageAndLimitValue = function checkPageAndLimitValue(pageValue, limitValue){
    if(!pageValue || !limitValue) {
        return new APIError(
            500,
            `Either of Page or limit Number is missing.`
        );
    } 
    return true;
}

exports.checkNumberOfOrders = function checkNumberOfOrders(ordersList){
  return ordersList.length;
}

//exports.parsePageLimitValue = parsePageLimitValue;
//exports.checkPageAndLimitValue = checkPageAndLimitValue;
